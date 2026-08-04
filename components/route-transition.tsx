'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useRouter, usePathname } from 'next/navigation'

type Phase = 'idle' | 'cover' | 'reveal'

const RouteTransitionContext = createContext<(href: string) => void>(() => {})

export const useRouteTransition = () => useContext(RouteTransitionContext)

// Vertical bars that fill in left -> right. The whole sweep is driven by a
// single rAF-animated `progress` value (0..1) rather than discrete interval
// ticks, so the motion is continuous and smooth instead of choppy. Each bar
// derives its own fill from `progress`, staged so they load one after another
// with a slight overlap that keeps the sweep fluid.
const COLUMNS = 6
const BAR_COLOR = '#d8d5d0' // soft gray so the orange K accent stands out
const SWEEP_MS = 780 // full left -> right cover sweep
const COVER_HOLD_MS = 160 // pause on the full logo before swapping routes
const REVEAL_MS = 640 // sweep clearing away to reveal the new page
// How much each bar's fill window overlaps the next (0 = strictly sequential,
// higher = more blended). A little overlap reads as one continuous wipe.
const BAR_OVERLAP = 0.4

// The three brand letters, revealed one at a time as the sweep crosses.
const LETTERS = [
  { src: '/mkv-letter-m.png', alt: 'M' },
  { src: '/mkv-letter-k.png', alt: 'K' },
  { src: '/mkv-letter-v.png', alt: 'V' },
]

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  // 0 = uncovered, 1 = fully covered. Animated continuously via rAF.
  const [progress, setProgress] = useState(0)
  const targetPathRef = useRef<string | null>(null)
  const rafRef = useRef<number | null>(null)

  // Animate `progress` from `from` -> `to` over `duration`, then run `onDone`.
  const animateProgress = useCallback(
    (from: number, to: number, duration: number, onDone?: () => void) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      const start = performance.now()
      const tick = (now: number) => {
        const t = clamp01((now - start) / duration)
        setProgress(from + (to - from) * easeInOutCubic(t))
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
          onDone?.()
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    },
    [],
  )

  const navigate = useCallback(
    (href: string) => {
      if (phase !== 'idle') return

      const targetPath = href.split(/[?#]/)[0]
      if (targetPath === pathname) return

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        router.push(href)
        return
      }

      targetPathRef.current = targetPath
      setPhase('cover')
      animateProgress(0, 1, SWEEP_MS, () => {
        window.setTimeout(() => router.push(href), COVER_HOLD_MS)
      })
    },
    [phase, pathname, router, animateProgress],
  )

  // Once the new route has mounted under the full cover, clear the sweep away.
  useEffect(() => {
    if (phase === 'cover' && pathname === targetPathRef.current) {
      const t = window.setTimeout(() => {
        setPhase('reveal')
        animateProgress(1, 0, REVEAL_MS, () => {
          setPhase('idle')
          targetPathRef.current = null
        })
      }, COVER_HOLD_MS)
      return () => window.clearTimeout(t)
    }
  }, [phase, pathname, animateProgress])

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  const active = phase !== 'idle'
  const segment = 1 / COLUMNS
  const barWindow = segment * (1 + BAR_OVERLAP)
  // Stagger the bar starts so the LAST bar still finishes exactly at
  // progress === 1 (otherwise its window runs past 1 and never fully closes).
  const startStep = (1 - barWindow) / (COLUMNS - 1)

  return (
    <RouteTransitionContext.Provider value={navigate}>
      {children}

      <div
        aria-hidden={!active}
        className="pointer-events-none fixed inset-0 z-[100] flex"
        style={{ visibility: active ? 'visible' : 'hidden' }}
      >
        {Array.from({ length: COLUMNS }).map((_, i) => {
          // Each bar fills across its own slice of the sweep, left -> right.
          const localProgress = clamp01((progress - i * startStep) / barWindow)
          const scaleX = easeInOutCubic(localProgress)

          return (
            <div key={i} className="relative h-full flex-1">
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  // Overhang 1px past the right edge so adjacent bars overlap
                  // and no hairline seam shows through.
                  right: -1,
                  backgroundColor: BAR_COLOR,
                  transformOrigin: 'left',
                  transform: `scaleX(${scaleX})`,
                  willChange: 'transform',
                }}
              />
            </div>
          )
        })}

        {/* Brand letters revealed one at a time as the sweep crosses. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-[0.12em] overflow-hidden">
          {LETTERS.map((letter, i) => {
            // Even thresholds so M, K, V pop in one by one across the sweep.
            const threshold = (i + 1) / (LETTERS.length + 1)
            const shown = progress >= threshold
            return (
              <img
                key={letter.src}
                src={letter.src || '/placeholder.svg'}
                alt={letter.alt}
                className="h-14 w-auto md:h-20"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown
                    ? 'translateY(0) scale(1)'
                    : 'translateY(8px) scale(0.96)',
                  transition:
                    'opacity 220ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            )
          })}
        </div>
      </div>
    </RouteTransitionContext.Provider>
  )
}

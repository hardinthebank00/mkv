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
// Solid base so the un-swept area / loading page never shows through as white.
const BASE_COLOR = '#c7c3bd' // darker gray field underneath the bars
const BAR_COLOR = '#dcd9d4' // lighter gray bars sweep over the base (two-tone)
const SWEEP_MS = 780 // full left -> right cover sweep
const COVER_HOLD_MS = 160 // pause on the full logo before swapping routes
const REVEAL_MS = 640 // sweep clearing away to reveal the new page
// How much each bar's fill window overlaps the next (0 = strictly sequential,
// higher = more blended). A little overlap reads as one continuous wipe.
const BAR_OVERLAP = 0.4

// Rather than stitch three separate letter crops (which split the orange
// accent that straddles the K/V boundary and left a stray fragment), we reveal
// the ONE original wordmark progressively with clip-path. Cuts land in the
// gaps between glyphs, and the orange parallelogram is fully contained in the
// K step, so it can never separate or misalign.
const WORDMARK = { src: '/mkv-wordmark.png', alt: 'MKV' }
// [progress threshold at which the step completes, fraction of wordmark shown]
const REVEAL_STEPS = [
  { at: 0.25, frac: 0.38 }, // M
  { at: 0.5, frac: 0.72 }, // K + orange accent (fully included)
  { at: 0.75, frac: 1.0 }, // V
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
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{ visibility: active ? 'visible' : 'hidden' }}
      >
        {/* Solid gray field that leads the sweep so the logo is never over
            white, and clears in sync with the bars on reveal (no hard cut). */}
        {(() => {
          const baseCover = clamp01(progress / 0.6)
          return (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: BASE_COLOR,
                clipPath: `inset(0 ${(1 - baseCover) * 100}% 0 0)`,
                WebkitClipPath: `inset(0 ${(1 - baseCover) * 100}% 0 0)`,
              }}
            />
          )
        })()}

        {/* Bars container: fills the screen left -> right */}
        <div className="absolute inset-0 flex">
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
        </div>

        {/* The wordmark revealed one glyph at a time via clip-path, on top. */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          {(() => {
            // Reveal fraction steps up as the sweep passes each threshold, so
            // M -> K -> V pop in one at a time with zero misalignment.
            const revealFrac = REVEAL_STEPS.reduce(
              (acc, step) => (progress >= step.at ? step.frac : acc),
              0,
            )
            return (
              <img
                src={WORDMARK.src || '/placeholder.svg'}
                alt={WORDMARK.alt}
                className="h-14 w-auto md:h-20"
                style={{
                  // Reveal from the left edge; hide the not-yet-shown remainder.
                  clipPath: `inset(0 ${(1 - revealFrac) * 100}% 0 0)`,
                  WebkitClipPath: `inset(0 ${(1 - revealFrac) * 100}% 0 0)`,
                  transition: 'clip-path 240ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            )
          })()}
        </div>
      </div>
    </RouteTransitionContext.Provider>
  )
}

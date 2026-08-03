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

// Vertical bars that fade/fill in one-at-a-time, left -> right. The sequence
// is driven by JS state (a timer bumps `count`) rather than CSS
// transition-delay, which the browser collapses when every bar's style
// changes in the same React commit (that was the "all at once" bug).
const COLUMNS = 6
const BAR_MS = 130 // time for a single bar to fill (and the gap to the next)
const BAR_COLOR = '#d8d5d0' // soft gray so the orange K accent stands out
const COVER_HOLD_MS = 120 // pause on the full logo before swapping routes

// The three brand letters, revealed one at a time as the sweep crosses.
const LETTERS = [
  { src: '/mkv-letter-m.png', alt: 'M' },
  { src: '/mkv-letter-k.png', alt: 'K' },
  { src: '/mkv-letter-v.png', alt: 'V' },
]

// Full left->right sweep = every bar filling back to back.
const SWEEP_MS = BAR_MS * COLUMNS
const COVER_MS = SWEEP_MS + COVER_HOLD_MS

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  // How many bars are currently filled (0..COLUMNS). Drives the staged sweep.
  const [count, setCount] = useState(0)
  const targetPathRef = useRef<string | null>(null)

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
      window.setTimeout(() => router.push(href), COVER_MS)
    },
    [phase, pathname, router],
  )

  // Cover phase: fill one bar per tick, left -> right.
  useEffect(() => {
    if (phase !== 'cover') return
    setCount(1)
    let c = 1
    const id = window.setInterval(() => {
      c += 1
      setCount(c)
      if (c >= COLUMNS) window.clearInterval(id)
    }, BAR_MS)
    return () => window.clearInterval(id)
  }, [phase])

  // Reveal phase: clear one bar per tick, left -> right.
  useEffect(() => {
    if (phase !== 'reveal') return
    let c = COLUMNS
    const id = window.setInterval(() => {
      c -= 1
      setCount(c)
      if (c <= 0) {
        window.clearInterval(id)
        setPhase('idle')
        targetPathRef.current = null
      }
    }, BAR_MS)
    return () => window.clearInterval(id)
  }, [phase])

  // Once the new route has mounted under the full cover, start revealing.
  useEffect(() => {
    if (phase === 'cover' && pathname === targetPathRef.current) {
      const t = window.setTimeout(() => setPhase('reveal'), COVER_HOLD_MS)
      return () => window.clearTimeout(t)
    }
  }, [phase, pathname])

  const active = phase !== 'idle'

  return (
    <RouteTransitionContext.Provider value={navigate}>
      {children}

      <div
        aria-hidden={!active}
        className="pointer-events-none fixed inset-0 z-[100] flex"
        style={{ visibility: active ? 'visible' : 'hidden' }}
      >
        {Array.from({ length: COLUMNS }).map((_, i) => {
          // A bar is filled when the sweep has reached its index.
          const filled = i < count

          return (
            <div key={i} className="relative h-full flex-1 overflow-hidden">
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: BAR_COLOR,
                  transformOrigin: 'left',
                  transform: filled ? 'scaleX(1)' : 'scaleX(0)',
                  opacity: filled ? 1 : 0,
                  transition: `transform ${BAR_MS}ms cubic-bezier(0.76, 0, 0.24, 1), opacity ${BAR_MS}ms ease`,
                }}
              />
            </div>
          )
        })}

        {/* Brand letters revealed one at a time as the sweep crosses. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[0.12em]">
          {LETTERS.map((letter, i) => {
            // Reveal each letter as the sweep passes its share of the screen.
            const revealThreshold = Math.round(
              ((i + 1) * COLUMNS) / (LETTERS.length + 1),
            )
            const shown = phase === 'cover' && count >= revealThreshold
            return (
              <img
                key={letter.src}
                src={letter.src || '/placeholder.svg'}
                alt={letter.alt}
                className="h-14 w-auto md:h-20"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 160ms ease, transform 160ms ease',
                }}
              />
            )
          })}
        </div>
      </div>
    </RouteTransitionContext.Provider>
  )
}

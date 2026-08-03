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

// Thin vertical bars that fill in left -> right (growing horizontally),
// then clear out left -> right to reveal the new page.
const COLUMNS = 6
const BAR_MS = 200 // how long a single bar takes to fill/clear
const STAGGER_MS = 48 // delay between each bar (drives the left->right sweep)

// The three brand letters, revealed one at a time as the sweep crosses.
const LETTERS = [
  { src: '/mkv-letter-m.png', alt: 'M' },
  { src: '/mkv-letter-k.png', alt: 'K' },
  { src: '/mkv-letter-v.png', alt: 'V' },
]

// Total time for all bars to finish a sweep (last bar starts + its duration).
const SWEEP_MS = BAR_MS + STAGGER_MS * (COLUMNS - 1)
// Small buffer so the screen is guaranteed fully covered before we swap routes.
const COVER_MS = SWEEP_MS + 60

export function RouteTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const targetPathRef = useRef<string | null>(null)

  const navigate = useCallback(
    (href: string) => {
      // Ignore while a transition is already running.
      if (phase !== 'idle') return

      const targetPath = href.split(/[?#]/)[0]
      // No transition needed when navigating to the current path.
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
      // Push once every bar has filled and the screen is covered.
      window.setTimeout(() => router.push(href), COVER_MS)
    },
    [phase, pathname, router],
  )

  // Once the new route has mounted under the cover, clear the bars away.
  useEffect(() => {
    if (phase === 'cover' && pathname === targetPathRef.current) {
      const t = window.setTimeout(() => setPhase('reveal'), 80)
      return () => window.clearTimeout(t)
    }
    if (phase === 'reveal') {
      const t = window.setTimeout(() => {
        setPhase('idle')
        targetPathRef.current = null
      }, SWEEP_MS + 40)
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
          // Cover: bars grow horizontally (scaleX 0->1) from the left, each
          // one starting a beat after the last => a left->right sweep.
          // Reveal: bars shrink back to the left (scaleX 1->0), same order.
          const filled = phase === 'cover'
          const delay = STAGGER_MS * i

          return (
            <div key={i} className="relative h-full flex-1 overflow-hidden">
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--primary)',
                  transformOrigin: 'left',
                  transform: filled ? 'scaleX(1)' : 'scaleX(0)',
                  transition:
                    phase === 'idle'
                      ? 'none'
                      : `transform ${BAR_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
                  transitionDelay: `${delay}ms`,
                }}
              />
            </div>
          )
        })}

        {/* Brand letters revealed one at a time, in sync with the sweep. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-[0.12em]">
          {LETTERS.map((letter, i) => {
            // Space each letter's reveal evenly across the sweep so M, K, V
            // pop in one after another as the bars travel left -> right.
            const revealAt = Math.round((SWEEP_MS - 120) * (i / LETTERS.length))
            return (
              <img
                key={letter.src}
                src={letter.src || '/placeholder.svg'}
                alt={letter.alt}
                className="h-14 w-auto md:h-20"
                style={{
                  opacity: phase === 'cover' ? 1 : 0,
                  transform:
                    phase === 'cover' ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 180ms ease, transform 180ms ease',
                  transitionDelay: phase === 'cover' ? `${revealAt}ms` : '0ms',
                }}
              />
            )
          })}
        </div>
      </div>
    </RouteTransitionContext.Provider>
  )
}

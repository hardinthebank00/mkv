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

// Vertical bars that fill in left -> right, then clear out left -> right.
const COLUMNS = 6
const BAR_MS = 260 // how long a single bar takes to fill/clear
const STAGGER_MS = 55 // delay between each bar

// Total time for all bars to finish a sweep (last bar starts + its duration).
const SWEEP_MS = BAR_MS + STAGGER_MS * (COLUMNS - 1)
// Small buffer so the screen is guaranteed fully covered before we swap routes.
const COVER_MS = SWEEP_MS + 40

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
      const t = window.setTimeout(() => setPhase('reveal'), 60)
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
          // Cover: bars fill top->bottom, staggered left->right.
          // Reveal: bars clear bottom->up, staggered left->right.
          const filled = phase === 'cover'
          const delay =
            phase === 'idle' ? 0 : STAGGER_MS * (phase === 'cover' ? i : i)

          return (
            <div key={i} className="relative h-full flex-1 overflow-hidden">
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--primary)',
                  transformOrigin: filled ? 'top' : 'bottom',
                  transform: filled ? 'scaleY(1)' : 'scaleY(0)',
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

        {/* Brand mark centered over the covered screen. */}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-4xl font-semibold lowercase tracking-tight text-black md:text-6xl"
          style={{
            opacity: phase === 'cover' ? 1 : 0,
            transform:
              phase === 'cover' ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 220ms ease, transform 220ms ease',
            transitionDelay: phase === 'cover' ? `${SWEEP_MS - 120}ms` : '0ms',
          }}
        >
          mkv
        </span>
      </div>
    </RouteTransitionContext.Provider>
  )
}

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

const COVER_MS = 560
const REVEAL_MS = 620

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
      // Push once the curtain has covered the screen.
      window.setTimeout(() => router.push(href), COVER_MS)
    },
    [phase, pathname, router],
  )

  // Once the new route has mounted under the curtain, reveal it.
  useEffect(() => {
    if (phase === 'cover' && pathname === targetPathRef.current) {
      const t = window.setTimeout(() => setPhase('reveal'), 80)
      return () => window.clearTimeout(t)
    }
    if (phase === 'reveal') {
      const t = window.setTimeout(() => {
        setPhase('idle')
        targetPathRef.current = null
      }, REVEAL_MS)
      return () => window.clearTimeout(t)
    }
  }, [phase, pathname])

  const active = phase !== 'idle'

  return (
    <RouteTransitionContext.Provider value={navigate}>
      {children}

      <div
        aria-hidden={!active}
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          // Curtain slides from bottom -> full cover -> off the top.
          transform:
            phase === 'cover'
              ? 'translateY(0%)'
              : phase === 'reveal'
                ? 'translateY(-100%)'
                : 'translateY(100%)',
          // Only animate while covering/revealing; snap back instantly when idle.
          transition:
            phase === 'idle'
              ? 'none'
              : `transform ${phase === 'cover' ? COVER_MS : REVEAL_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          backgroundColor: 'var(--primary)',
        }}
      >
        <span
          className="font-mono text-4xl font-semibold lowercase tracking-tight text-black md:text-6xl"
          style={{
            opacity: phase === 'cover' ? 1 : 0,
            transform: phase === 'cover' ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 360ms ease, transform 360ms ease`,
          }}
        >
          mkv
        </span>
      </div>
    </RouteTransitionContext.Provider>
  )
}

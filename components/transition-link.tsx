'use client'

import { useRouteTransition } from '@/components/route-transition'

type TransitionLinkProps = {
  href: string
  className?: string
  children: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>

/**
 * Anchor that plays the branded route-transition curtain before navigating.
 * Use for internal page routes ("/start", "/privacy", "/terms").
 */
export function TransitionLink({
  href,
  className,
  children,
  ...rest
}: TransitionLinkProps) {
  const navigateWithTransition = useRouteTransition()

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        navigateWithTransition(href)
      }}
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}

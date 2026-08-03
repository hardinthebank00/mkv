'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '@/lib/scroll-to-section'

const links = [
  { href: '#services', label: 'services' },
  { href: '#work', label: 'work' },
  { href: '#ai', label: 'ai' },
  { href: '#about', label: 'studio' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // When we land on the home page with a hash (e.g. navigating from /start),
  // flow into the target section once layout has settled.
  useEffect(() => {
    if (pathname !== '/') return
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const timer = setTimeout(() => scrollToSection(hash), 120)
    return () => clearTimeout(timer)
  }, [pathname])

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      window.history.replaceState(null, '', '/')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
    }
  }

  // Smoothly flow into an on-page section, or navigate home first if needed.
  const handleSectionNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault()
    setOpen(false)
    const id = href.slice(1)
    if (pathname === '/') {
      scrollToSection(id)
    } else {
      router.push(`/${href}`)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between pl-4 pr-4 md:pl-6 md:pr-6">
        <a href="#" onClick={handleLogoClick} className="flex items-center" aria-label="MKV Company home">
          <img
            src="/mkv-wordmark.png"
            alt="MKV Company"
            className="h-11 w-auto md:h-12"
          />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSectionNav(e, link.href)}
              className="label-mono transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="status-pill hidden lg:inline-flex">
            <span
              className="size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            mkv / §d2c
          </span>
          <a
            href="/start"
            className="hidden items-center rounded-full bg-primary px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-black transition-opacity hover:opacity-90 sm:inline-flex"
          >
            start a project
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="sr-only">Toggle navigation</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-2 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSectionNav(e, link.href)}
              className="label-mono rounded-md px-2 py-3 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

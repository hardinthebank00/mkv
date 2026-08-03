'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { scrollToSection } from '@/lib/scroll-to-section'

const linkColumns = [
  {
    heading: 'studio',
    links: [
      { href: '#services', label: 'services' },
      { href: '#work', label: 'selected work' },
      { href: '#ai', label: 'ai operations' },
      { href: '#about', label: 'the studio' },
    ],
  },
  {
    heading: 'connect',
    links: [
      { href: '/start', label: 'start a project' },
      { href: 'mailto:main@mkvcompany.business', label: 'email' },
    ],
  },
  {
    heading: 'legal',
    links: [
      { href: '/privacy', label: 'privacy policy' },
      { href: '/terms', label: 'terms of service' },
    ],
  },
]

export function SiteFooter() {
  const pathname = usePathname()
  const router = useRouter()
  const isStartPage = pathname === '/start'

  // Smoothly flow into an on-page section. When we're not on the home page
  // (e.g. /start), navigate home with the hash and let it scroll on load.
  const handleSectionNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const id = href.slice(1)
    if (pathname === '/') {
      scrollToSection(id)
    } else {
      router.push(`/${href}`)
    }
  }

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return
    e.preventDefault()
    window.history.replaceState(null, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background text-foreground">
      {/* Wrapper for overlapping layout */}
      <div className="relative">
        {/* Dark section (conditional content) */}
        <div className="relative -mb-px overflow-hidden rounded-[2.5rem] bg-black px-4 py-20 md:mx-4 md:py-32 lg:mx-6">
          {/* Large muted background text */}
          <div className="absolute inset-0 flex items-center justify-end overflow-hidden pr-4 md:pr-12">
            <span className="text-[15rem] font-semibold leading-none text-white/8 md:text-[20rem] lg:text-[25rem]">
              mkv
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            {isStartPage ? (
              <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
                {/* Start page content: what happens next */}
                <div className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                    here&apos;s what happens next
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
                    we&apos;ll build <span className="italic">with</span> you.
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                    After we review your inquiry, we&apos;ll schedule an intro call
                    to dig into your goals, audit your current setup, and scope out
                    what a partnership looks like.
                  </p>
                </div>

                {/* Right: secondary info or nothing */}
                <div className="shrink-0 space-y-6 text-sm text-white/70">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                      response
                    </p>
                    <p className="mt-2 text-lg font-medium text-white">
                      24–48 hrs
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                      format
                    </p>
                    <p className="mt-2 text-lg font-medium text-white">
                      intro call
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
                {/* Home page content: CTA */}
                <div className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                    let's work together
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
                    ready to scale?
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                    Let&apos;s build the tools and systems your D2C brand needs to
                    move, grow, and dominate.
                  </p>
                </div>

                {/* Right: CTA */}
                <div className="shrink-0">
                  <a
                    href="/start"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-black transition-opacity hover:opacity-90"
                  >
                    start today
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Light footer section (below dark box) */}
        <div className="border-t border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:py-20">
              {/* Brand + description */}
              <div className="md:col-span-5">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex size-8 items-center justify-center rounded bg-primary font-mono text-xs font-semibold tracking-tight text-primary-foreground">
                    mkv
                  </span>
                  <span className="font-mono text-sm uppercase tracking-[0.14em] text-foreground">
                    company
                  </span>
                </span>
                <p className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
                  d2c growth studio turning vision into visibility. engineering,
                  paid media, lifecycle, and ai operations for direct-to-consumer
                  brands.
                </p>
              </div>

              {/* Link columns */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
                {linkColumns.map((column) => (
                  <nav key={column.heading} aria-label={column.heading}>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {column.heading}
                    </span>
                    <ul className="mt-5 flex flex-col gap-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={(e) => handleSectionNav(e, link.href)}
                            className="text-sm lowercase text-foreground/80 transition-colors hover:text-primary"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>
            </div>

            {/* Bottom hairline bar */}
            <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-8 md:flex-row md:items-center">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
                &copy; {new Date().getFullYear()} mkv company
              </p>
              <a
                href="#top"
                onClick={handleScrollTop}
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
              >
                mkvcompany.business
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

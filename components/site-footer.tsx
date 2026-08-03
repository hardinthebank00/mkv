'use client'

import Link from 'next/link'

const linkColumns = [
  {
    heading: 'studio',
    links: [
      { href: '#services', label: 'services' },
      { href: '#work', label: 'work' },
      { href: '#ai', label: 'ai operations' },
      { href: '#about', label: 'studio' },
    ],
  },
  {
    heading: 'connect',
    links: [
      { href: '#contact', label: 'start a project' },
      { href: 'mailto:contact@mkvcompany.business', label: 'email' },
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
  return (
    <footer className="bg-background text-foreground">
      {/* Light section */}
      <div className="border-t border-border">
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
              className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
            >
              mkvcompany.business
            </a>
          </div>
        </div>
      </div>

      {/* Dark contact section (23.agency style) */}
      <div className="relative overflow-hidden bg-black py-20 md:py-32">
        {/* Large muted number background */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pr-4 md:pr-12">
          <span className="text-[15rem] font-semibold leading-none text-white/8 md:text-[20rem] lg:text-[25rem]">
            mkv
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            {/* Left: headline + description */}
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                let's work together
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
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
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-black transition-opacity hover:opacity-90"
              >
                start today
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

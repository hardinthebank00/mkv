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
    <footer className="border-t border-border bg-background text-foreground">
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
    </footer>
  )
}

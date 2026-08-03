const navLinks = [
  { href: '#services', label: 'services' },
  { href: '#work', label: 'work' },
  { href: '#ai', label: 'ai operations' },
  { href: '#about', label: 'studio' },
  { href: '#contact', label: 'contact' },
]

const legalLinks = [
  { href: '/privacy', label: 'privacy policy' },
  { href: '/terms', label: 'terms of service' },
]

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-6">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-background/50">
              vision to visibility
            </span>
            <h2 className="mt-6 max-w-md text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
              let&apos;s build your next{' '}
              <span className="font-serif italic text-primary">chapter</span>.
            </h2>
            <a
              href="mailto:contact@mkvcompany.business"
              className="mt-8 inline-flex items-center gap-3 border-b border-background/25 pb-2 transition-colors hover:border-primary"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-background/50">
                email
              </span>
              <span className="text-lg font-medium tracking-tight">
                contact@mkvcompany.business
              </span>
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-3 md:col-start-8"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-background/50">
              menu
            </span>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm uppercase tracking-[0.08em] text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="md:col-span-2">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-background/50">
              legal
            </span>
            <ul className="mt-5 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm uppercase tracking-[0.08em] text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-background/15 py-8 md:flex-row md:items-center">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex size-7 items-center justify-center rounded bg-primary font-mono text-xs font-semibold tracking-tight text-primary-foreground">
              mkv
            </span>
            <span className="font-mono text-sm uppercase tracking-[0.14em] text-background/80">
              company
            </span>
          </span>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-background/50">
            &copy; {new Date().getFullYear()} mkv company — all rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

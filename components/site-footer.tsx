const footerLinks = [
  { href: '#services', label: 'Services' },
  { href: '#ai', label: 'AI Solutions' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

export function SiteFooter() {
  return (
    <footer className="py-14">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <a
            href="#top"
            className="text-lg font-bold italic tracking-tight text-foreground"
          >
            MKV Company
          </a>
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>This website is operated by MKV Company</p>
          <p className="mt-1">mkvcompany.business</p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} MKV Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

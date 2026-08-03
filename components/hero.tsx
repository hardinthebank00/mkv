const stats = [
  { value: '120+', label: 'Storefronts Launched' },
  { value: '96%', label: 'Client Retention' },
  { value: '24/7', label: 'Support Coverage' },
]

const platforms = [
  { name: 'Shopify', src: '/logos/shopify-default.svg', href: 'https://www.shopify.com' },
  { name: 'Mailchimp', src: '/logos/mailchimp-default.svg', href: 'https://mailchimp.com' },
  { name: 'Meta Ads', src: '/logos/meta-default.svg', href: 'https://www.facebook.com/business/ads' },
  { name: 'Google Ads', src: '/logos/google-ads-default.svg', href: 'https://ads.google.com' },
  { name: 'TikTok', src: '/logos/tiktok-default.svg', href: 'https://ads.tiktok.com' },
  { name: 'Stripe', src: '/logos/stripe-default.svg', href: 'https://stripe.com' },
  { name: 'Next.js', src: '/logos/nextdotjs-default.svg', href: 'https://nextjs.org' },
  { name: 'Vercel', src: '/logos/vercel.svg', href: 'https://vercel.com' },
]

// Repeat the list so a single group is always wider than the viewport,
// which keeps the -50% marquee loop seamless with no blank gaps.
const marqueeGroup = [...platforms, ...platforms, ...platforms]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_75%)]"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
        <img
          src="/mkv-logo.png"
          alt="MKV Company — Vision to Visibility"
          className="mb-10 h-28 w-auto sm:h-32 md:h-40"
        />
        <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Your D2C E-Commerce Partner
        </h1>
        <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg">
          MKV Company builds, scales, and automates online brands. From
          storefront engineering to paid media, retention, and AI-powered
          operations, we run the full commerce stack so your team can focus on
          product.
        </p>

        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card px-6 py-6"
            >
              <div className="text-3xl font-bold tracking-tight text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-y border-border bg-card/40 py-8">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Platforms we build on
        </p>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Single track holding two identical halves; translateX(-50%)
              scrolls exactly one half so the loop is perfectly seamless. */}
          <div className="flex w-max shrink-0 animate-marquee items-center">
            {[...marqueeGroup, ...marqueeGroup].map((platform, index) => (
              <a
                key={`${platform.name}-${index}`}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${platform.name}`}
                className="flex items-center px-8 sm:px-12"
              >
                <img
                  src={platform.src || '/placeholder.svg'}
                  alt=""
                  className="h-10 w-auto transition-transform duration-300 hover:scale-110 md:h-12"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

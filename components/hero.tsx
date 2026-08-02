const stats = [
  { value: '120+', label: 'Storefronts Launched' },
  { value: '96%', label: 'Client Retention' },
  { value: '24/7', label: 'Support Coverage' },
]

const platforms = [
  'Shopify Plus',
  'Klaviyo',
  'Meta Ads',
  'Google Ads',
  'TikTok Shop',
  'Stripe',
  'Next.js',
  'Vercel',
  'Postscript',
  'Triple Whale',
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--background)_75%)]"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center md:py-32">
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
              <div className="text-3xl font-bold tracking-tight">
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
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max shrink-0 animate-marquee items-center">
            {[...platforms, ...platforms].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="px-10 text-lg font-semibold tracking-tight text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

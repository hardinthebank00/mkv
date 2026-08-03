const work = [
  {
    ref: '§001',
    category: 'apparel',
    title: 'headless replatform',
    summary:
      'Rebuilt a legacy storefront on a headless stack, cutting load time and lifting checkout conversion.',
    metrics: [
      { value: '2.4x', label: 'faster loads' },
      { value: '+37%', label: 'checkout cvr' },
    ],
  },
  {
    ref: '§002',
    category: 'beauty',
    title: 'paid media rebuild',
    summary:
      'Restructured Meta and TikTok accounts around contribution margin with a fresh creative testing engine.',
    metrics: [
      { value: '4.1x', label: 'blended roas' },
      { value: '-28%', label: 'cac' },
    ],
  },
  {
    ref: '§003',
    category: 'home goods',
    title: 'lifecycle overhaul',
    summary:
      'Segmented email and SMS flows that reactivated dormant customers and grew repeat revenue.',
    metrics: [
      { value: '+58%', label: 'retention' },
      { value: '32%', label: 'rev from flows' },
    ],
  },
]

export function SelectedWork() {
  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-6 border-b border-border py-8">
          <div>
            <span className="label-mono">selected work</span>
            <h2 className="mt-4 max-w-xl font-serif font-semibold italic text-3xl font-medium tracking-tight md:text-5xl">
              outcomes we&apos;ve <span className="accent-serif">shipped</span>
            </h2>
          </div>
          <span className="label-mono hidden shrink-0 md:inline">/ 003</span>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border-x border-b border-border bg-border md:grid-cols-3">
          {work.map((item) => (
            <article
              key={item.ref}
              className="group relative flex flex-col justify-between bg-background p-6 transition-colors hover:bg-muted/40 md:p-8"
            >
              <span
                className="absolute right-6 top-6 h-2 w-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              <div>
                <div className="flex items-center gap-3">
                  <span className="label-mono">{item.ref}</span>
                  <span className="label-mono">— {item.category}</span>
                </div>
                <h3 className="mt-6 font-serif font-semibold italic text-2xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                {item.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-2xl font-medium tracking-tight text-primary">
                      {metric.value}
                    </div>
                    <div className="label-mono mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

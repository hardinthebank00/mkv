import { AccentWord } from './accent-word'
import { TransitionLink } from './transition-link'

const capabilities = [
  { title: 'support agents', description: 'AI-powered customer service that handles inquiries, orders, and support 24/7.' },
  { title: 'demand forecasting', description: 'Predict inventory needs and customer demand to optimize stock levels.' },
  { title: 'margin-aware pricing', description: 'Dynamic pricing that maximizes profitability while staying competitive.' },
  { title: 'lifecycle personalization', description: 'Tailor customer experiences and offers based on their journey stage.' },
  { title: 'anomaly reporting', description: 'Surface unusual patterns in sales, inventory, and customer behavior instantly.' },
  { title: 'catalog automation', description: 'Auto-generate product descriptions, tags, and content at scale.' },
]

export function AiSolutions() {
  return (
    <section id="ai" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-6 border-b border-border py-8">
          <span className="label-mono">ai-first operations</span>
          <span className="label-mono hidden shrink-0 md:inline">/ 004</span>
        </div>

        <div className="py-16 md:py-24">
          <p className="max-w-4xl text-balance text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl md:leading-[1.1]">
            we treat ai as{' '}
            <AccentWord>infrastructure</AccentWord>, not a feature.
            practical systems that shorten response times, sharpen forecasting,
            and remove the repetitive work that{' '}
            <span className="ink-highlight">slows a growing brand down.</span>
          </p>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
            {capabilities.map((capability, index) => (
              <div
                key={capability.title}
                className="group flex flex-col gap-3 bg-background px-6 py-6 transition-colors hover:bg-muted/50"
                title={capability.description}
              >
                <div className="flex items-center gap-3">
                  <span className="label-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-medium tracking-tight">
                    {capability.title}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>

          <TransitionLink
            href="/start"
            className="mt-12 inline-flex items-center rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
          >
            explore ai solutions
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}

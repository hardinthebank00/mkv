import { Bot, BrainCircuit, Workflow, Zap, Check } from 'lucide-react'

const capabilities = [
  'Product discovery and recommendation models',
  'Support agents trained on your catalog',
  'Demand forecasting and stock planning',
  'Margin-aware pricing experiments',
  'Segment-level lifecycle personalization',
  'Reporting agents that surface anomalies',
]

const cards = [
  { icon: Bot, title: 'Support Agents', copy: 'Resolution around the clock' },
  {
    icon: BrainCircuit,
    title: 'Forecasting',
    copy: 'Plan inventory with confidence',
  },
  { icon: Workflow, title: 'Automation', copy: 'Fewer manual back-office hours' },
  { icon: Zap, title: 'Live Signals', copy: 'Decisions in the same session' },
]

export function AiSolutions() {
  return (
    <section id="ai" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            AI-First Approach
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Building the Next Generation of Commerce with AI
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            We treat AI as infrastructure, not a feature. Our team ships
            practical systems that shorten response times, sharpen forecasting,
            and remove the repetitive work that slows a growing brand down.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore AI Solutions
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-5 inline-flex size-10 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
                <card.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">
                {card.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {card.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

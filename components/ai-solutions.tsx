import { AccentWord } from './accent-word'
import { TransitionLink } from './transition-link'

const capabilities = [
  'support agents',
  'demand forecasting',
  'margin-aware pricing',
  'lifecycle personalization',
  'anomaly reporting',
  'catalog automation',
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
            <AccentWord>ai-first</AccentWord> capabilities that{' '}
            <span className="ink-highlight">move the needle</span> on unit economics and operational efficiency.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
            {capabilities.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 bg-background px-6 py-6"
              >
                <span className="label-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-lg font-medium tracking-tight">
                  {item}
                </span>
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

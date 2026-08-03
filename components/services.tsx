import { AccentWord } from './accent-word'

const services = [
  {
    index: '01',
    title: 'storefront engineering',
    accent: 'built to convert',
    description:
      'Headless and native storefronts built for speed, checkout conversion, and clean handoff to your internal team.',
    tags: ['Shopify', 'Headless', 'Next.js'],
  },
  {
    index: '02',
    title: 'paid acquisition',
    accent: 'margin, not vanity',
    description:
      'Creative testing and media buying across Meta, Google, and TikTok, managed against contribution margin instead of vanity metrics.',
    tags: ['Meta', 'Google', 'TikTok'],
  },
  {
    index: '03',
    title: 'retention & lifecycle',
    accent: 'repeat revenue',
    description:
      'Email and SMS programs, segmentation, and automated flows that turn a first order into a repeat customer.',
    tags: ['Email', 'SMS', 'Loyalty'],
  },
  {
    index: '04',
    title: 'commerce strategy',
    accent: 'a roadmap you can staff',
    description:
      'Merchandising, pricing, and operations reviews with a roadmap you can actually staff and execute.',
    tags: ['Strategy', 'Pricing', 'Ops'],
  },
]

export function Services() {
  return (
    <section id="services" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-6 border-b border-border py-8">
          <div>
            <span className="label-mono">services</span>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-medium tracking-tight md:text-5xl">
              four levers we pull to{' '}
              <AccentWord>grow</AccentWord> your brand
            </h2>
          </div>
          <span className="label-mono hidden shrink-0 md:inline">/ 002</span>
        </div>

        <div>
          {services.map((service) => (
            <article
              key={service.index}
              className="group grid grid-cols-1 gap-4 border-b border-border py-8 transition-colors hover:bg-muted/40 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
            >
              <div className="label-mono md:col-span-1">{service.index}</div>

              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-1 text-lg md:text-xl">
                  <AccentWord>{service.accent}</AccentWord>
                </p>
              </div>

              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-5">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

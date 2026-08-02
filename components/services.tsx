import { Code2, Megaphone, Mail, LineChart } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Storefront Engineering',
    description:
      'Headless and native storefronts built for speed, checkout conversion, and clean handoff to your internal team.',
  },
  {
    icon: Megaphone,
    title: 'Paid Acquisition',
    description:
      'Creative testing and media buying across Meta, Google, and TikTok, managed against contribution margin instead of vanity metrics.',
  },
  {
    icon: Mail,
    title: 'Retention & Lifecycle',
    description:
      'Email and SMS programs, segmentation, and automated flows that turn a first order into a repeat customer.',
  },
  {
    icon: LineChart,
    title: 'Commerce Strategy',
    description:
      'Merchandising, pricing, and operations reviews with a roadmap you can actually staff and execute.',
  },
]

export function Services() {
  return (
    <section id="services" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            What We Do
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Full-Service E-Commerce Solutions
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Everything required to launch a brand, grow demand, and keep
            customers coming back.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/25"
            >
              <div className="mb-5 inline-flex size-10 items-center justify-center rounded-lg border border-border bg-secondary">
                <service.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

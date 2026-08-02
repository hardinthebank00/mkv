import { ShieldCheck, Award, Handshake, Lock } from 'lucide-react'

const values = [
  {
    icon: ShieldCheck,
    title: 'Clear Reporting',
    description:
      'Shared dashboards and plain-language updates, so you always know where budget and hours went.',
  },
  {
    icon: Award,
    title: 'Senior Execution',
    description:
      'The people who scope your project are the people who build it. No handoffs to a junior bench.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    description:
      'We plan in quarters, not campaigns, and we optimise for the health of the business.',
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    description:
      'Data handling, access control, and payment workflows built to satisfy processor and privacy requirements.',
  },
]

const badges = [
  { title: 'PCI DSS', subtitle: 'Aligned' },
  { title: 'GDPR', subtitle: 'Compliant' },
  { title: 'SOC 2', subtitle: 'Practices' },
  { title: 'SSL/TLS', subtitle: 'Secured' },
]

export function About() {
  return (
    <section id="about" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            A Commerce Team That Works Like Yours
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            MKV Company is a digital commerce studio helping brands sell better
            online. We pair engineering, growth marketing, and applied AI to
            deliver results you can measure on the P&amp;L.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {values.map((value) => (
            <article
              key={value.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                <value.icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="rounded-xl border border-border bg-card px-4 py-5 text-center"
            >
              <div className="font-mono text-sm font-semibold tracking-wide">
                {badge.title}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {badge.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

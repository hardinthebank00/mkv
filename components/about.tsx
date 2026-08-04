import { AccentWord } from './accent-word'

const values = [
  {
    index: '01',
    title: 'clear reporting',
    description:
      'Shared dashboards and plain-language updates, so you always know where budget and hours went.',
  },
  {
    index: '02',
    title: 'senior execution',
    description:
      'The people who scope your project are the people who build it. No handoffs to a junior bench.',
  },
  {
    index: '03',
    title: 'long-term partnership',
    description:
      'We plan in quarters, not campaigns, and we optimise for the health of the business.',
  },
  {
    index: '04',
    title: 'security & compliance',
    description:
      'Data handling, access control, and payment workflows built to satisfy processor and privacy requirements.',
  },
]

const badges = [
  { title: 'PCI DSS', subtitle: 'aligned' },
  { title: 'GDPR', subtitle: 'compliant' },
  { title: 'SOC 2', subtitle: 'practices' },
  { title: 'SSL/TLS', subtitle: 'secured' },
]

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-6 border-b border-border py-8">
          <span className="label-mono">the studio</span>
          <span className="label-mono hidden shrink-0 md:inline">/ 005</span>
        </div>

        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
              a commerce team that works like{' '}
              <AccentWord>yours</AccentWord>
            </h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
              We build and scale D2C brands. Engineering, growth, and AI working
              together to drive revenue and free up your time.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
              {badges.map((badge) => (
                <div key={badge.title} className="bg-background px-4 py-5">
                  <div className="font-mono text-sm font-medium tracking-wide">
                    {badge.title}
                  </div>
                  <div className="label-mono mt-1">{badge.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="border-t border-border">
              {values.map((value) => (
                <article
                  key={value.index}
                  className="flex gap-6 border-b border-border py-6"
                >
                  <span className="label-mono shrink-0 pt-1">
                    {value.index}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

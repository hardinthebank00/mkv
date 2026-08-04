'use client'

import { useState } from 'react'
import { AccentWord } from './accent-word'
import { ChevronDown } from 'lucide-react'

const services = [
  {
    index: '01',
    title: 'storefront engineering',
    accent: 'built to convert',
    description:
      'Custom websites, automated workflows, and AI powered customer service agents that handle customer conversations and orders. Built for speed, designed to sell, and easy for your team to run.',
    tags: ['Shopify', 'Headless', 'Next.js'],
    expandable: true,
    expandedContent: 'we treat ai as infrastructure, not a feature. practical systems that shorten response times, sharpen forecasting, and remove the repetitive work that slows a growing brand down.',
  },
  {
    index: '02',
    title: 'paid acquisition',
    accent: 'margin, not vanity',
    description:
      'Creative testing, content creator sourcing, and media buying across Meta, Google, and TikTok. We focus on profit, not just likes and clicks.',
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

function ServiceItem({ service }: { service: (typeof services)[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <article className="group grid grid-cols-1 gap-4 border-b border-border py-8 transition-colors hover:bg-muted/40 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
        <div className="label-mono md:col-span-1">{service.index}</div>

        <div className="md:col-span-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-1 text-lg md:text-xl">
                <AccentWord>{service.accent}</AccentWord>
              </p>
            </div>
            {service.expandable && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-1 shrink-0 text-muted-foreground transition-transform hover:text-foreground"
                aria-expanded={expanded}
                aria-label={`${expanded ? 'Hide' : 'Show'} AI details`}
              >
                <ChevronDown
                  className={`size-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>
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

      {expanded && 'expandedContent' in service && (
        <div className="border-b border-border bg-muted/30 px-4 py-8 md:px-6 md:py-10">
          <p className="max-w-3xl text-balance text-lg leading-relaxed text-foreground/80">
            {service.expandedContent}
          </p>
        </div>
      )}
    </>
  )
}

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
            <ServiceItem key={service.index} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

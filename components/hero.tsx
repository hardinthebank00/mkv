'use client'

import { useEffect, useRef, useState } from 'react'

const rotatingWords = ['move', 'grow', 'support', 'assist', 'scale']

const platforms = [
  { name: 'Shopify', src: '/logos/shopify-default.svg', href: 'https://www.shopify.com' },
  { name: 'Mailchimp', src: '/logos/mailchimp-default.svg', href: 'https://mailchimp.com' },
  { name: 'Meta Ads', src: '/logos/meta-default.svg', href: 'https://www.facebook.com/business/ads' },
  { name: 'Google Ads', src: '/logos/google-ads-default.svg', href: 'https://ads.google.com' },
  { name: 'TikTok', src: '/logos/tiktok-default.svg', href: 'https://ads.tiktok.com' },
  { name: 'Stripe', src: '/logos/stripe-default.svg', href: 'https://stripe.com' },
  { name: 'Next.js', src: '/logos/nextdotjs-default.svg', href: 'https://nextjs.org' },
  { name: 'Vercel', src: '/logos/vercel.svg', href: 'https://vercel.com' },
]

// Repeat the list so a single group is always wider than the viewport,
// which keeps the -50% marquee loop seamless with no blank gaps.
const marqueeGroup = [...platforms, ...platforms, ...platforms]

const stats = [
  { value: '4.1x', label: 'blended roas' },
  { value: '+58%', label: 'retention lift' },
  { value: '120+', label: 'storefronts shipped' },
  { value: '96%', label: 'client retention' },
]

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [widths, setWidths] = useState<number[]>([])
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const measure = () =>
      setWidths(measureRefs.current.map((el) => el?.offsetWidth ?? 0))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const activeWidth = widths[wordIndex]

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        {/* Eyebrow row */}
        <div className="flex items-center justify-between gap-4 border-b border-border py-5">
          <span className="label-mono">d2c growth studio</span>
          <span className="label-mono hidden sm:inline">
            vision to visibility
          </span>
          <span className="label-mono">/ 001</span>
        </div>

        {/* Headline */}
        <div className="py-14 md:py-20">
          <h1 className="max-w-5xl text-balance text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            we build tools that{' '}
            <span
              className="relative inline-flex h-[1.05em] overflow-hidden align-[-0.16em] leading-none transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={activeWidth ? { width: activeWidth } : undefined}
              aria-hidden="true"
            >
              <span
                className="flex flex-col leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateY(-${wordIndex * 1.05}em)` }}
              >
                {rotatingWords.map((word, i) => (
                  <span
                    key={word}
                    ref={(el) => {
                      measureRefs.current[i] = el
                    }}
                    className="flex h-[1.05em] w-fit items-center whitespace-nowrap leading-none"
                  >
                    <span className="mark-highlight font-serif italic">
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            </span>
            <span className="sr-only">
              {rotatingWords.join(', ')} your business
            </span>{' '}
            your business.
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              MKV Company is a full-service partner for direct-to-consumer
              brands — engineering, paid media, lifecycle, and AI operations
              under one roof.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
              >
                start a project
              </a>
              <a
                href="#work"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-muted"
              >
                selected work
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-px overflow-hidden border-y border-border bg-border md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background px-5 py-8">
              <span
                className="mb-4 block h-2 w-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              <div className="text-3xl font-medium tracking-tight md:text-4xl">
                {stat.value}
              </div>
              <div className="label-mono mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform marquee */}
      <div className="mt-14 border-t border-border py-8">
        <div className="mx-auto mb-6 max-w-6xl px-4 md:px-6">
          <span className="label-mono">platforms we build on</span>
        </div>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Single track holding two identical halves; translateX(-50%)
              scrolls exactly one half so the loop is perfectly seamless. */}
          <div className="flex w-max shrink-0 animate-marquee items-center">
            {[...marqueeGroup, ...marqueeGroup].map((platform, index) => (
              <a
                key={`${platform.name}-${index}`}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${platform.name}`}
                className="flex items-center px-8 sm:px-12"
              >
                <img
                  src={platform.src || '/placeholder.svg'}
                  alt=""
                  className="h-9 w-auto opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-10"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

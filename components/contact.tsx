'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

const fieldClass =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Get in Touch
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Grow Your Store?
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Tell us where the business is today and what you want the next
            twelve months to look like. We&apos;ll come back with a scoped plan.
          </p>

          <a
            href="mailto:contact@mkvcompany.business"
            className="mt-8 inline-flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/45"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <span className="text-left">
              <span className="block text-sm text-muted-foreground">
                Email us at
              </span>
              <span className="block text-sm font-semibold">
                contact@mkvcompany.business
              </span>
            </span>
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="text-lg font-semibold tracking-tight">
            Send us a message
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Fill out the form and we&apos;ll reply within one business day.
          </p>

          {sent ? (
            <p
              role="status"
              className="mt-8 rounded-lg border border-border bg-secondary px-4 py-6 text-center text-sm leading-relaxed"
            >
              Thanks for reaching out. Your message is on its way to the MKV
              Company team.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <input id="company" name="company" className={fieldClass} />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className={fieldClass}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

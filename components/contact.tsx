'use client'

import { useState } from 'react'

const fieldClass =
  'w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'

const labelClass = 'label-mono'

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-6 border-b border-border py-8">
          <span className="label-mono">contact</span>
          <span className="label-mono hidden shrink-0 md:inline">/ 006</span>
        </div>

        <div className="grid grid-cols-1 gap-14 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-balance text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
              ready to grow your <span className="accent-serif">store</span>?
            </h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Tell us where the business is today and what you want the next
              twelve months to look like. We&apos;ll come back with a scoped
              plan.
            </p>

            <a
              href="mailto:main@mkvcompany.business"
              className="mt-10 inline-flex items-center gap-3 border-b border-border pb-2 transition-colors hover:border-primary"
            >
              <span className="label-mono">email</span>
              <span className="text-lg font-medium tracking-tight">
                main@mkvcompany.business
              </span>
            </a>
          </div>

          <div className="lg:col-span-7">
            {sent ? (
              <div
                role="status"
                className="flex h-full flex-col items-start justify-center border border-border p-10"
              >
                <span
                  className="mb-6 h-2 w-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <p className="text-2xl font-medium tracking-tight">
                  thanks for reaching out.
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your message is on its way to the MKV Company team. We&apos;ll
                  reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className={labelClass}>
                      first name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      required
                      className={fieldClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className={labelClass}>
                      last name
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
                  <label htmlFor="email" className={labelClass}>
                    email
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
                  <label htmlFor="company" className={labelClass}>
                    company
                  </label>
                  <input id="company" name="company" className={fieldClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className={labelClass}>
                    message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={fieldClass}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90 sm:w-auto sm:self-start sm:px-10"
                >
                  send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

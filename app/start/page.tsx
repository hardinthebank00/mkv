'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AccentWord } from '@/components/accent-word'
import { submitInquiry, type ContactState } from './actions'

const fieldClass =
  'w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'

const labelClass = 'label-mono'

const initialState: ContactState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-black transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:self-start sm:px-10"
    >
      {pending ? 'sending…' : 'send inquiry'}
    </button>
  )
}

export default function StartPage() {
  const [state, formAction] = useActionState(submitInquiry, initialState)
  const sent = state.status === 'success'

  return (
    <>
      <SiteHeader />
      <main>
        <section id="inquiry" className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="flex items-end justify-between gap-6 border-b border-border py-8">
              <span className="label-mono">inquiry</span>
              <span className="label-mono hidden shrink-0 md:inline">/ 007</span>
            </div>

            <div className="grid grid-cols-1 gap-14 py-16 md:py-24 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h1 className="text-balance text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
                  let&apos;s build something <AccentWord>great</AccentWord>.
                </h1>
                <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
                  Tell us about your business, where you want to go, and what you&apos;re looking to solve. We&apos;ll review and get back to you within 48 hours with next steps.
                </p>

                <a
                  href="mailto:contact@mkvcompany.business"
                  className="mt-10 inline-flex items-center gap-3 border-b border-border pb-2 transition-colors hover:border-primary"
                >
                  <span className="label-mono">email</span>
                  <span className="text-lg font-medium tracking-tight">
                    mkvcompany.business
                  </span>
                </a>

                <div className="mt-16 space-y-6 border-t border-border pt-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      response time
                    </p>
                    <p className="mt-2 text-lg font-medium">24–48 hours</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      next steps
                    </p>
                    <p className="mt-2 text-lg font-medium">intro call, proposal</p>
                  </div>
                </div>
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
                      Your inquiry is on its way to the MKV Company team. We&apos;ll
                      review and get back to you within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form action={formAction} className="flex flex-col gap-8">
                    {/* Honeypot — hidden from users, bots tend to fill it */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="company_url">
                        Do not fill this field
                      </label>
                      <input
                        id="company_url"
                        name="company_url"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

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
                      <input
                        id="company"
                        name="company"
                        className={fieldClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="website" className={labelClass}>
                        website
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        className={fieldClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className={labelClass}>
                        tell us about your goals
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className={fieldClass}
                      />
                    </div>

                    {state.status === 'error' && state.message ? (
                      <p
                        role="alert"
                        className="text-sm leading-relaxed text-destructive"
                      >
                        {state.message}
                      </p>
                    ) : null}

                    <SubmitButton />
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

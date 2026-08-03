import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'

type LegalPageProps = {
  title: string
  subtitle: string
  updated: string
  children: React.ReactNode
}

export function LegalPage({ title, subtitle, updated, children }: LegalPageProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex h-20 w-full items-center justify-between pl-4 pr-6">
          <Link href="/" className="flex items-center" aria-label="MKV Company home">
            <img
              src="/mkv-logo.png"
              alt="MKV Company — Vision to Visibility"
              className="h-12 w-auto md:h-14"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-20">
        <section className="border-b border-border bg-secondary/50">
          <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-20">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">{subtitle}</p>
            <p className="mt-6 text-sm text-muted-foreground">Last updated: {updated}</p>
          </div>
        </section>

        <div className="mx-auto w-full max-w-3xl px-6 py-14">
          <div className="flex flex-col gap-10">{children}</div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

type LegalSectionProps = {
  heading: string
  children: React.ReactNode
}

export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{heading}</h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

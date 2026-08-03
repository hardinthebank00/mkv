import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'

type LegalPageProps = {
  title: string
  subtitle: string
  updated: string
  index: string
  children: React.ReactNode
}

export function LegalPage({
  title,
  subtitle,
  updated,
  index,
  children,
}: LegalPageProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between pl-4 pr-4 md:pl-6 md:pr-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="MKV Company home"
          >
            <img
              src="/mkv-icon.png"
              alt=""
              aria-hidden="true"
              className="h-11 w-11 shrink-0 object-contain md:h-12 md:w-12"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              mkv company
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
          <section className="border-b border-border py-16 md:py-20">
            <div className="flex items-center justify-between gap-4">
              <span className="label-mono">legal</span>
              <span className="label-mono">/ {index}</span>
            </div>
            <h1 className="mt-8 text-balance text-4xl font-medium tracking-tight sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
            <p className="label-mono mt-8">last updated — {updated}</p>
          </section>

          <div className="py-14">
            <div className="flex flex-col">{children}</div>
          </div>
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
    <section className="grid grid-cols-1 gap-4 border-b border-border py-8 md:grid-cols-12 md:gap-8">
      <h2 className="text-lg font-medium tracking-tight text-foreground md:col-span-4">
        {heading}
      </h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground md:col-span-8">
        {children}
      </div>
    </section>
  )
}

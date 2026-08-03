import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { SelectedWork } from '@/components/selected-work'
import { AiSolutions } from '@/components/ai-solutions'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <SelectedWork />
        <AiSolutions />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

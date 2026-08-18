import { Hero } from '../sections/Hero'
import { CommitteeIntro } from '../sections/CommitteeIntro'
import { CommitteePipeline } from '../sections/CommitteePipeline'
import { ProductShowcase } from '../sections/ProductShowcase'
import { DevilsAdvocate } from '../sections/DevilsAdvocate'
import { Synthesis } from '../sections/Synthesis'
import { CallToAction } from '../sections/CallToAction'
import { Header } from './Header'
import { Footer } from './Footer'

/**
 * Top-level page composition. New homepage sections are added here in later
 * phases; this phase intentionally renders only the header and hero.
 */
export function PageShell() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CommitteeIntro />
        <CommitteePipeline />
        <ProductShowcase />
        <DevilsAdvocate />
        <Synthesis />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

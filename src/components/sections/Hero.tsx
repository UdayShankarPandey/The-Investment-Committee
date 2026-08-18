import { Badge } from '../ui/Badge'
import { CommitteePanel } from './CommitteePanel'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">The Investment Committee</p>
          <h1 id="hero-title">Don&apos;t ask AI for an answer.<br />Make it argue for one.</h1>
          <p className="hero__lede">
            A structured AI research committee that investigates, challenges, and synthesizes an investment thesis before delivering a verdict.
          </p>
          <a className="button button--primary hero__cta" href="#convene">Convene the committee <span aria-hidden="true">↗</span></a>
          <p className="hero__disclosure">Illustrative research workflow. Not investment advice.</p>
        </div>

        <div className="hero__product" id="committee-demo" aria-label="Illustrative committee analysis interface">
          <div className="hero__product-label">
            <Badge tone="accent">Illustrative interface</Badge>
            <span>Committee simulation</span>
          </div>
          <CommitteePanel />
        </div>
      </div>
    </section>
  )
}

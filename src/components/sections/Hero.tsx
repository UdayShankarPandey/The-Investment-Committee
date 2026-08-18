import { Badge } from '../ui/Badge'
import { CommitteePanel } from './CommitteePanel'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function Hero() {
  const { domRef, isVisible } = useIntersectionObserver()

  return (
    <section 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`hero ${isVisible ? 'is-visible' : ''}`} 
      aria-labelledby="hero-title"
    >
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow reveal-up" style={{ transitionDelay: '300ms' }}>The Investment Committee</p>
          <h1 id="hero-title" className="reveal-up" style={{ transitionDelay: '450ms' }}>
            Don&apos;t ask AI for an answer.<br />Make it argue for one.
          </h1>
          <p className="hero__lede reveal-up" style={{ transitionDelay: '600ms' }}>
            A structured AI research committee that investigates, challenges, and synthesizes an investment thesis before delivering a verdict.
          </p>
          <a className="button button--primary hero__cta reveal-up" href="#convene" style={{ transitionDelay: '750ms' }}>
            Convene the committee <span aria-hidden="true">↗</span>
          </a>
          <p className="hero__disclosure reveal-fade" style={{ transitionDelay: '900ms' }}>Illustrative research workflow. Not investment advice.</p>
        </div>

        <div className="hero__product reveal-up" style={{ transitionDelay: '850ms', transitionDuration: '460ms' }} id="committee-demo" aria-label="Illustrative committee analysis interface">
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

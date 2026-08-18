import { SectionLabel } from '../ui/SectionLabel'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function CallToAction() {
  const { domRef, isVisible } = useIntersectionObserver({ threshold: 0.25 })

  return (
    <section 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`cta-section ${isVisible ? 'is-visible' : ''}`} 
      id="convene" 
      aria-labelledby="cta-title"
    >
      <div className="container cta-section__inner">
        <div className="reveal-up">
          <SectionLabel>The committee</SectionLabel>
        </div>
        <h2 id="cta-title" className="reveal-up" style={{ transitionDelay: '150ms' }}>Put the thesis to work.</h2>
        <p className="reveal-up" style={{ transitionDelay: '300ms' }}>See what survives the committee.</p>
        
        <div className="cta-section__action reveal-scale" style={{ transitionDelay: '450ms' }}>
          <a className="button button--primary" href="#convene">
            Convene the committee <span aria-hidden="true">→</span>
          </a>
        </div>
        
        <p className="cta-section__disclosure reveal-fade" style={{ transitionDelay: '600ms' }}>
          Illustrative research workflow. Not investment advice.
        </p>
      </div>
    </section>
  )
}

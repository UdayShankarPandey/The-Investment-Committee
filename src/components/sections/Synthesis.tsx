import { SectionLabel } from '../ui/SectionLabel'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function Synthesis() {
  const { domRef, isVisible } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <section 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`synthesis ${isVisible ? 'is-visible' : ''}`} 
      id="synthesis" 
      aria-labelledby="synthesis-title"
    >
      <div className="container synthesis__inner">
        <div className="reveal-fade">
          <SectionLabel>Synthesis</SectionLabel>
        </div>
        <h2 id="synthesis-title" className="reveal-fade" style={{ transitionDelay: '300ms' }}>Confidence requires friction.</h2>
        <p className="reveal-fade" style={{ transitionDelay: '600ms' }}>
          The goal is not to generate a simple answer. It is to produce a thesis that has survived research, opposing arguments, risk analysis, and structured scrutiny.
        </p>
      </div>
    </section>
  )
}

import { SectionLabel } from '../ui/SectionLabel'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function CommitteeIntro() {
  const { domRef, isVisible } = useIntersectionObserver({ threshold: 0.25 })

  return (
    <section 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`committee-intro ${isVisible ? 'is-visible' : ''}`} 
      id="committee-intro" 
      aria-labelledby="committee-intro-title"
    >
      <div className="container committee-intro__grid">
        <div className="reveal-fade">
          <SectionLabel>The committee</SectionLabel>
        </div>
        <div className="reveal-clip" style={{ transitionDelay: '150ms' }}>
          <h2 id="committee-intro-title">One thesis.<br />Multiple perspectives.<br /><em>One decision.</em></h2>
        </div>
        <p className="reveal-fade" style={{ transitionDelay: '300ms' }}>
          Every thesis enters the committee with a case to make. It leaves after being researched, challenged, debated, and stress-tested.
        </p>
      </div>
    </section>
  )
}

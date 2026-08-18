import { PipelineStage } from '../product/PipelineStage'
import { SectionLabel } from '../ui/SectionLabel'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function CommitteePipeline() {
  const { domRef, isVisible } = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`committee-pipeline ${isVisible ? 'is-visible' : ''}`} 
      id="committee-pipeline" 
      aria-labelledby="pipeline-title"
    >
      <div className="container">
        <div className="section-intro">
          <div className="reveal-fade">
            <SectionLabel>How the committee works</SectionLabel>
          </div>
          <div className="reveal-up" style={{ transitionDelay: '150ms' }}>
            <h2 id="pipeline-title">A process built to meet its own counterargument.</h2>
            <p>Each stage has a defined role, a distinct point of view, and a reason to challenge what came before.</p>
          </div>
        </div>

        <div className="pipeline" aria-label="Six-stage investment research committee process">
          <div className="pipeline__center">
            <PipelineStage number="01" name="Research desk" role="Build the evidence base." />
          </div>

          <div className="pipeline__fork reveal-clip" style={{ transitionDelay: '350ms' }} aria-hidden="true" />

          <div className="pipeline__opposition">
            <PipelineStage number="02" name="Bull analyst" role="Build the strongest case for the thesis." tone="bull" />
            <PipelineStage number="03" name="Bear analyst" role="Attack the thesis and identify weaknesses." tone="bear" />
          </div>

          <div className="pipeline__merge reveal-clip" style={{ transitionDelay: '500ms' }} aria-hidden="true" />

          <div className="pipeline__center">
            <PipelineStage number="04" name="Debate" role="Let opposing arguments challenge each other." />
          </div>

          <div className="pipeline__connector reveal-clip" style={{ transitionDelay: '600ms' }} aria-hidden="true" />

          <div className="pipeline__center">
            <PipelineStage number="05" name="Risk officer" role="Surface material risks and failure conditions." tone="risk" />
          </div>

          <div className="pipeline__connector reveal-clip" style={{ transitionDelay: '700ms' }} aria-hidden="true" />

          <div className="pipeline__center">
            <PipelineStage number="06" name="CIO" role="Synthesize the evidence into a final committee verdict." tone="verdict" />
          </div>
        </div>
      </div>
    </section>
  )
}

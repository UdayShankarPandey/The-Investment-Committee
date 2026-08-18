import { SectionLabel } from '../ui/SectionLabel'

export function CallToAction() {
  return (
    <section className="cta-section" id="convene" aria-labelledby="cta-title">
      <div className="container cta-section__inner">
        <SectionLabel>The committee</SectionLabel>
        <h2 id="cta-title">Put the thesis to work.</h2>
        <p>See what survives the committee.</p>
        
        <div className="cta-section__action">
          <a className="button button--primary" href="#convene">
            Convene the committee <span aria-hidden="true">→</span>
          </a>
        </div>
        
        <p className="cta-section__disclosure">
          Illustrative research workflow. Not investment advice.
        </p>
      </div>
    </section>
  )
}

import { Badge } from '../ui/Badge'
import { Divider } from '../ui/Divider'
import { SectionLabel } from '../ui/SectionLabel'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const cases = [
  {
    tone: 'bull',
    direction: '↑',
    label: 'Bull case',
    title: 'A durable thesis',
    items: ['Services mix may cushion variability.', 'Ecosystem retention could support demand.', 'Margin resilience warrants investigation.'],
  },
  {
    tone: 'bear',
    direction: '↓',
    label: 'Bear case',
    title: 'A demanding counter-thesis',
    items: ['Valuation may constrain upside.', 'Device-cycle exposure still matters.', 'Regional exposure needs scrutiny.'],
  },
]

const risks = [
  { label: 'Valuation sensitivity', level: 'Medium', tone: 'risk' },
  { label: 'Concentration exposure', level: 'Low', tone: 'neutral' },
  { label: 'Macro conditions', level: 'Medium', tone: 'risk' },
]

export function ProductShowcase() {
  const { domRef, isVisible } = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`product-showcase ${isVisible ? 'is-visible' : ''}`} 
      id="product-showcase" 
      aria-labelledby="showcase-title"
    >
      <div className="container">
        <div className="showcase-intro">
          <div>
            <div className="reveal-fade">
              <SectionLabel>Inside a committee run</SectionLabel>
            </div>
            <h2 id="showcase-title" className="reveal-up" style={{ transitionDelay: '150ms' }}>Reasoning that stays visible from evidence to verdict.</h2>
          </div>
          <p className="reveal-fade" style={{ transitionDelay: '300ms' }}>Instead of collapsing a thesis into one answer, the interface preserves the cases, rebuttals, and risks behind its synthesis.</p>
        </div>

        <article className="research-workspace reveal-up" style={{ transitionDelay: '450ms' }} aria-label="Illustrative committee research workspace">
          <header className="research-workspace__header">
            <div>
              <p>The Investment Committee</p>
              <span>Committee simulation · Not live data</span>
            </div>
            <Badge tone="accent">Illustrative interface</Badge>
          </header>

          <div className="research-workspace__thesis reveal-fade" style={{ transitionDelay: '550ms' }}>
            <div>
              <p className="workspace-label">Illustrative thesis</p>
              <h3>AAPL <span>Apple Inc.</span></h3>
            </div>
            <ol aria-label="Committee stage sequence">
              <li>Research</li><li>Bull / Bear</li><li>Debate</li><li>Risk</li><li>Verdict</li>
            </ol>
          </div>

          <Divider />

          <section className="evidence-ledger reveal-fade" style={{ transitionDelay: '650ms' }} aria-labelledby="evidence-title">
            <div>
              <p className="workspace-label">Research desk</p>
              <h3 id="evidence-title">Evidence ledger</h3>
            </div>
            <ul>
              <li>Demand resilience</li>
              <li>Margin durability</li>
              <li>Regulatory exposure</li>
            </ul>
            <p>Questions to validate before the committee reaches a conclusion.</p>
          </section>

          <Divider />

          <div className="case-grid reveal-fade" style={{ transitionDelay: '750ms' }}>
            {cases.map((caseItem) => (
              <section className={`case-panel case-panel--${caseItem.tone}`} key={caseItem.tone}>
                <p className="case-panel__label"><span aria-hidden="true">{caseItem.direction}</span>{caseItem.label}</p>
                <h3>{caseItem.title}</h3>
                <ul>{caseItem.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>

          <Divider />

          <section className="showcase-debate reveal-fade" style={{ transitionDelay: '850ms' }} aria-labelledby="showcase-debate-title">
            <div>
              <p className="workspace-label">Debate / rebuttal</p>
              <h3 id="showcase-debate-title">The cases answer each other.</h3>
            </div>
            <div className="debate-exchange">
              <p><span>Bull</span> The thesis may remain durable through a softer device cycle.</p>
              <p><span>Bear</span> That assumes resilience is not already embedded in expectations.</p>
            </div>
          </section>

          <Divider />

          <div className="workspace-outcome reveal-fade" style={{ transitionDelay: '950ms' }}>
            <section className="risk-ledger" aria-labelledby="risk-ledger-title">
              <div>
                <p className="workspace-label">Risk officer</p>
                <h3 id="risk-ledger-title">Failure conditions</h3>
              </div>
              <ul>
                {risks.map((risk) => (
                  <li key={risk.label}><span>{risk.label}</span><strong className={`risk-level risk-level--${risk.tone}`}>{risk.level}</strong></li>
                ))}
              </ul>
            </section>

            <section className="workspace-verdict" aria-labelledby="workspace-verdict-title">
              <p className="workspace-label">CIO verdict</p>
              <h3 id="workspace-verdict-title">Watch</h3>
              <p>Continue research before a decision.</p>
              <span>Illustrative synthesis</span>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}

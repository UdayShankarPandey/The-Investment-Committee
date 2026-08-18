import { Badge } from '../ui/Badge'
import { Divider } from '../ui/Divider'
import { StatusIndicator } from '../ui/StatusIndicator'

const perspectives = [
  {
    tone: 'bull' as const,
    label: 'Bull',
    title: 'Services momentum',
    copy: 'A recurring-revenue mix can support the illustrative thesis through changing device cycles.',
  },
  {
    tone: 'bear' as const,
    label: 'Bear',
    title: 'Valuation pressure',
    copy: 'High expectations can leave little room for execution risk in the illustrative thesis.',
  },
]

export function CommitteePanel() {
  return (
    <article className="committee-panel">
      <header className="committee-panel__header">
        <div>
          <p>Committee live</p>
          <span>Example analysis · Not live data</span>
        </div>
        <Badge tone="accent">Analysis</Badge>
      </header>

      <div className="committee-panel__security">
        <p className="committee-panel__ticker">AAPL</p>
        <p>Apple Inc. <span>Illustrative thesis</span></p>
      </div>

      <Divider />

      <div className="perspective-grid" id="the-committee">
        {perspectives.map((perspective) => (
          <section className={`perspective perspective--${perspective.tone}`} key={perspective.tone}>
            <p className="perspective__label"><span aria-hidden="true">{perspective.tone === 'bull' ? '↑' : '↓'}</span>{perspective.label}</p>
            <h2>{perspective.title}</h2>
            <p>{perspective.copy}</p>
          </section>
        ))}
      </div>

      <Divider />

      <section className="committee-panel__debate" id="how-it-works" aria-labelledby="debate-title">
        <p className="committee-panel__label">Debate</p>
        <h2 id="debate-title">The thesis is tested, not repeated.</h2>
        <ul>
          <li><span>Bull</span> Services durability may offset a softer hardware cycle.</li>
          <li><span>Bear</span> Resilience may already be reflected in the starting valuation.</li>
        </ul>
      </section>

      <Divider />

      <div className="committee-panel__outcome">
        <section>
          <p className="committee-panel__label">Risk officer</p>
          <StatusIndicator tone="risk" label="Valuation sensitivity" detail="Medium attention required" />
        </section>
        <section className="verdict">
          <p className="committee-panel__label">CIO verdict</p>
          <strong>Watch</strong>
          <span>Continue research</span>
        </section>
      </div>
    </article>
  )
}

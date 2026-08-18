import { SectionLabel } from '../ui/SectionLabel'

export function Synthesis() {
  return (
    <section className="synthesis" id="synthesis" aria-labelledby="synthesis-title">
      <div className="container synthesis__inner">
        <SectionLabel>Synthesis</SectionLabel>
        <h2 id="synthesis-title">Confidence requires friction.</h2>
        <p>
          The goal is not to generate a simple answer. It is to produce a thesis that has survived research, opposing arguments, risk analysis, and structured scrutiny.
        </p>
      </div>
    </section>
  )
}

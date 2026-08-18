import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Container } from '../ui/Container'
import { Divider } from '../ui/Divider'
import { SectionLabel } from '../ui/SectionLabel'
import { StatusIndicator } from '../ui/StatusIndicator'

/**
 * Internal-only preview for visual tokens and UI primitives. It is not a
 * homepage section and contains no product metrics or marketing claims.
 */
export function DesignSystemShowcase() {
  return (
    <div className="design-preview">
      <Container>
        <div className="design-preview__intro">
          <SectionLabel>Internal design-system preview</SectionLabel>
          <h1>Measured clarity for complex decisions.</h1>
          <p>
            A restrained visual language for structured research, contrasting viewpoints, and readable judgment.
          </p>
        </div>

        <Divider />

        <section className="preview-section" aria-labelledby="type-heading">
          <div className="preview-section__heading">
            <SectionLabel>01 / Typography</SectionLabel>
            <h2 id="type-heading">Hierarchy without noise</h2>
          </div>
          <div className="type-specimen">
            <p className="eyebrow">Research note · 18 August 2026</p>
            <p className="display-sample">A thesis is stronger when it is challenged.</p>
            <p className="body-sample">
              Calm contrast, compact metadata, and intentionally limited emphasis help analytical information remain legible.
            </p>
            <p className="metadata-sample">Source context · Review state · 12:40 IST</p>
          </div>
        </section>

        <Divider />

        <section className="preview-section" aria-labelledby="controls-heading">
          <div className="preview-section__heading">
            <SectionLabel>02 / Controls</SectionLabel>
            <h2 id="controls-heading">Clear intent, quiet mechanics</h2>
          </div>
          <div className="control-row">
            <Button>Primary action <span aria-hidden="true">↗</span></Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="quiet">Text action</Button>
          </div>
          <div className="badge-row" aria-label="Badge examples">
            <Badge>Research</Badge>
            <Badge tone="accent">In review</Badge>
            <Badge tone="bull">Bull · upside</Badge>
            <Badge tone="bear">Bear · challenge</Badge>
          </div>
        </section>

        <Divider />

        <section className="preview-section" aria-labelledby="states-heading">
          <div className="preview-section__heading">
            <SectionLabel>03 / Analytical states</SectionLabel>
            <h2 id="states-heading">Distinct signals, more than color</h2>
          </div>
          <div className="state-grid">
            <Card>
              <p className="card__kicker">Perspective</p>
              <StatusIndicator tone="bull" label="Bull case" detail="Opportunity and supporting evidence" />
              <p className="card__note">Uses an upward marker and positive language alongside the green state.</p>
            </Card>
            <Card>
              <p className="card__kicker">Counterpoint</p>
              <StatusIndicator tone="bear" label="Bear case" detail="Downside and disconfirming evidence" />
              <p className="card__note">Uses a downward marker and cautionary language alongside the red state.</p>
            </Card>
            <Card>
              <p className="card__kicker">Control</p>
              <StatusIndicator tone="risk" label="Risk review" detail="Assumptions requiring attention" />
              <p className="card__note">Amber signals investigation rather than a definitive negative outcome.</p>
            </Card>
            <Card>
              <p className="card__kicker">Synthesis</p>
              <StatusIndicator tone="verdict" label="Committee view" detail="Reasoned outcome awaiting review" />
              <p className="card__note">A high-contrast neutral state reserves emphasis for the conclusion.</p>
            </Card>
          </div>
        </section>

        <Divider />

        <section className="preview-section" aria-labelledby="surface-heading">
          <div className="preview-section__heading">
            <SectionLabel>04 / Surfaces</SectionLabel>
            <h2 id="surface-heading">Editorial frame, terminal discipline</h2>
          </div>
          <div className="surface-grid">
            <Card className="surface-card">
              <span className="surface-card__index">01</span>
              <h3>Evidence panel</h3>
              <p>Fine rules and low-elevation surfaces create separation without turning every group into a floating card.</p>
            </Card>
            <Card className="surface-card surface-card--emphasis">
              <span className="surface-card__index">02</span>
              <h3>Decision panel</h3>
              <p>The accent is reserved for intentional direction, not decoration.</p>
            </Card>
          </div>
        </section>

        <p className="design-preview__footnote">Preview only · No investment guidance or product output is shown.</p>
      </Container>
    </div>
  )
}

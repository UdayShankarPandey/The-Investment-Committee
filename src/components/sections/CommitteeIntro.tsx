import { SectionLabel } from '../ui/SectionLabel'

export function CommitteeIntro() {
  return (
    <section className="committee-intro" id="committee-intro" aria-labelledby="committee-intro-title">
      <div className="container committee-intro__grid">
        <SectionLabel>The committee</SectionLabel>
        <div>
          <h2 id="committee-intro-title">One thesis.<br />Multiple perspectives.<br /><em>One decision.</em></h2>
        </div>
        <p>
          Every thesis enters the committee with a case to make. It leaves after being researched, challenged, debated, and stress-tested.
        </p>
      </div>
    </section>
  )
}

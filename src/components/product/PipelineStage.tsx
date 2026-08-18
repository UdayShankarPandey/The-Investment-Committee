type PipelineStageProps = {
  number: string
  name: string
  role: string
  tone?: 'neutral' | 'bull' | 'bear' | 'risk' | 'verdict'
}

export function PipelineStage({ number, name, role, tone = 'neutral' }: PipelineStageProps) {
  return (
    <article className={`pipeline-stage pipeline-stage--${tone}`}>
      <p className="pipeline-stage__number">{number}</p>
      <div>
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </article>
  )
}

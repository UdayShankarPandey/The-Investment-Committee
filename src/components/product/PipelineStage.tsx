import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

type PipelineStageProps = {
  number: string
  name: string
  role: string
  tone?: 'neutral' | 'bull' | 'bear' | 'risk' | 'verdict'
}

export function PipelineStage({ number, name, role, tone = 'neutral' }: PipelineStageProps) {
  const { domRef, isVisible } = useIntersectionObserver({ threshold: 0.25 })

  return (
    <article 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`pipeline-stage pipeline-stage--${tone} reveal-up ${isVisible ? 'is-visible' : ''}`}
    >
      <p className="pipeline-stage__number">{number}</p>
      <div>
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </article>
  )
}

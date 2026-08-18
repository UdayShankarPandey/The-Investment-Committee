type StatusTone = 'bull' | 'bear' | 'risk' | 'verdict'

type StatusIndicatorProps = {
  label: string
  tone: StatusTone
  detail: string
}

export function StatusIndicator({ label, tone, detail }: StatusIndicatorProps) {
  return (
    <div className={`status status--${tone}`}>
      <span className="status__marker" aria-hidden="true" />
      <span>
        <strong>{label}</strong>
        <small>{detail}</small>
      </span>
    </div>
  )
}

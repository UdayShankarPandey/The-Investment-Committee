import type { ReactNode } from 'react'

type SectionLabelProps = {
  children: ReactNode
}

export function SectionLabel({ children }: Readonly<SectionLabelProps>) {
  return <p className="section-label">{children}</p>
}

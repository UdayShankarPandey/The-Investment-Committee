import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: Readonly<CardProps>) {
  return <section className={`card ${className}`.trim()}>{children}</section>
}

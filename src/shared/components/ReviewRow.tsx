import { ArrowRight, Check } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export function ReviewRow({
  icon,
  title,
  children,
  to,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  to?: string
}) {
  return (
    <section className="review-row">
      <span className="row-icon">{icon}</span>
      <div className="row-body">
        <h3>{title}</h3>
        {children}
      </div>
      {to && (
        <Link to={to} className="edit-link" aria-label={`Edit ${title}`}>
          Edit <ArrowRight size={15} />
        </Link>
      )}
    </section>
  )
}

export function SummaryCheck({ children }: { children: ReactNode }) {
  return (
    <span className="summary-check">
      <Check size={15} />
      {children}
    </span>
  )
}

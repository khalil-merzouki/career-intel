import type { ReactNode } from 'react'

export interface DashboardPanelProps {
  id: string
  title: string
  description: string
  action?: ReactNode
  children: ReactNode
}

export function DashboardPanel({
  id,
  title,
  description,
  action,
  children,
}: DashboardPanelProps) {
  return (
    <section className="dashboard-panel" aria-labelledby={id}>
      <header className="dashboard-panel-header">
        <div>
          <h2 id={id}>{title}</h2>
          <p>{description}</p>
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

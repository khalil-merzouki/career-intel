export interface DashboardDateProps {
  date: string
}

export function DashboardDate({ date }: DashboardDateProps) {
  const parsed = new Date(`${date}T12:00:00`)
  const day = Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat('en', { day: 'numeric' }).format(parsed)
  const month = Number.isNaN(parsed.getTime())
    ? ''
    : new Intl.DateTimeFormat('en', { month: 'short' }).format(parsed)
  return (
    <time className="dashboard-date" dateTime={date}>
      <strong>{day}</strong>
      <span>{month}</span>
    </time>
  )
}

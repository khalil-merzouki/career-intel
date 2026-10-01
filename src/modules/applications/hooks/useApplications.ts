import { useEffect, useState } from 'react'
import { applicationApi } from '../api/applicationApi'
import { applicationStages, isActiveStage } from '../stages'
import type { Application } from '../types'

function nextDate(application: Application) {
  const today = new Date().toISOString().slice(0, 10)
  return [
    ...application.importantDates,
    ...application.interviews
      .filter((item) => item.status === 'scheduled')
      .map((item) => ({ id: item.id, label: item.title, date: item.date })),
  ]
    .filter((item) => item.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0]
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'active' | 'closed'>('active')

  useEffect(() => {
    let active = true
    applicationApi
      .list()
      .then((items) => {
        if (active) setApplications(items)
      })
      .catch((issue: Error) => {
        if (active) setError(issue.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const active = applications.filter((item) => isActiveStage(item.stage))
  const closed = applications.filter((item) => !isActiveStage(item.stage))
  const visible = filter === 'active' ? active : closed
  const groups = applicationStages
    .filter((stage) => stage.active === (filter === 'active'))
    .map((stage) => ({
      ...stage,
      applications: visible
        .filter((item) => item.stage === stage.value)
        .map((item) => ({ ...item, upcoming: nextDate(item) })),
    }))
    .filter((group) => group.applications.length > 0)
  return {
    groups,
    visibleCount: visible.length,
    activeCount: active.length,
    closedCount: closed.length,
    filter,
    setFilter,
    loading,
    error,
  }
}

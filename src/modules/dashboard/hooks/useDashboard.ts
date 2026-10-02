import { useEffect, useState } from 'react'
import { dashboardApi } from '../api/dashboardApi'
import type { DashboardSummary } from '../types'

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    dashboardApi
      .get()
      .then((result) => {
        if (active) setSummary(result)
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

  return { summary, loading, error }
}

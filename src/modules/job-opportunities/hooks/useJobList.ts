import { useEffect, useState } from 'react'
import { jobApi } from '../api/jobApi'
import type { JobOpportunity } from '../types'

export function useJobList() {
  const [opportunities, setOpportunities] = useState<JobOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    jobApi
      .list()
      .then((result) => {
        if (active) setOpportunities(result)
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

  return { opportunities, loading, error }
}

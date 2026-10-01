import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { applicationApi } from '../api/applicationApi'
import type { Application, ApplicationSource } from '../types'

export function useApplicationConversion(jobId: string) {
  const [source, setSource] = useState<ApplicationSource | null>(null)
  const [existing, setExisting] = useState<Application | null>(null)
  const [appliedOn, setAppliedOn] = useState(() => {
    const now = new Date()
    return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, 10)
  })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    Promise.all([applicationApi.source(jobId), applicationApi.forJob(jobId)])
      .then(([job, application]) => {
        if (active) {
          setSource(job)
          setExisting(application)
        }
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
  }, [jobId])

  async function create() {
    if (!source || busy) return
    if (!appliedOn) {
      setError('Choose the date you applied.')
      return
    }
    setBusy(true)
    setError('')
    try {
      const application = await applicationApi.create({
        jobId: source.id,
        appliedOn,
      })
      await navigate({
        to: '/applications/$applicationId',
        params: { applicationId: application.id },
      })
    } catch (issue) {
      setError((issue as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return {
    source,
    existing,
    appliedOn,
    setAppliedOn,
    loading,
    busy,
    error,
    create,
  }
}

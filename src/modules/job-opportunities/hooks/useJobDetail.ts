import { useEffect, useState } from 'react'
import { jobApi } from '../api/jobApi'
import type { JobOpportunity, MatchAnalysis, TrackingStatus } from '../types'
import { isValidJobUrl } from '../utils/validation'

export function useJobDetail(jobId: string) {
  const [opportunity, setOpportunity] = useState<JobOpportunity | null>(null)
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([jobApi.get(jobId), jobApi.match(jobId)])
      .then(([job, match]) => {
        if (!active) return
        setOpportunity(job)
        setNotes(job.notes)
        setAnalysis(match)
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

  async function persist(trackingStatus?: TrackingStatus) {
    if (!opportunity || busy) return
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const updated = await jobApi.save({
        ...opportunity,
        notes,
        trackingStatus: trackingStatus ?? opportunity.trackingStatus,
      })
      setOpportunity(updated)
      setNotice(
        trackingStatus === 'archived'
          ? 'Opportunity archived.'
          : trackingStatus === 'applied'
            ? 'Marked as applied.'
            : trackingStatus === 'saved'
              ? 'Opportunity restored.'
              : 'Notes saved.',
      )
    } catch (issue) {
      setError((issue as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return {
    opportunity,
    analysis,
    notes,
    setNotes,
    loading,
    busy,
    error,
    notice,
    notesChanged: notes !== (opportunity?.notes ?? ''),
    canApply: Boolean(opportunity?.url && isValidJobUrl(opportunity.url)),
    save: () => persist(),
    setTrackingStatus: persist,
  }
}

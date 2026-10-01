import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { jobApi } from '../api/jobApi'
import type {
  JobOpportunity,
  JobRequirement,
  RequirementCategory,
} from '../types'
import { isValidJobUrl } from '../utils/validation'

export function useJobReview(jobId: string) {
  const [opportunity, setOpportunity] = useState<JobOpportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [urlError, setUrlError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    setLoading(true)
    jobApi
      .get(jobId)
      .then((result) => {
        if (active) setOpportunity(result)
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

  function updateDetails(changes: Partial<JobOpportunity>) {
    setOpportunity((current) =>
      current ? { ...current, ...changes } : current,
    )
    if (
      changes.url !== undefined &&
      (!changes.url.trim() || isValidJobUrl(changes.url.trim()))
    ) {
      setUrlError('')
    }
  }

  function updateRequirement(id: string, changes: Partial<JobRequirement>) {
    setOpportunity((current) =>
      current
        ? {
            ...current,
            requirements: current.requirements.map((item) =>
              item.id === id ? { ...item, ...changes } : item,
            ),
          }
        : current,
    )
  }

  function addRequirement(category: RequirementCategory) {
    const requirement: JobRequirement = {
      id: crypto.randomUUID(),
      category,
      text: '',
      priority: 'required',
    }
    setOpportunity((current) =>
      current
        ? { ...current, requirements: [...current.requirements, requirement] }
        : current,
    )
  }

  function removeRequirement(id: string) {
    setOpportunity((current) =>
      current
        ? {
            ...current,
            requirements: current.requirements.filter((item) => item.id !== id),
          }
        : current,
    )
  }

  async function confirm() {
    if (!opportunity) return
    if (opportunity.url.trim() && !isValidJobUrl(opportunity.url.trim())) {
      const message =
        'Enter a valid job URL beginning with http:// or https://.'
      setUrlError(message)
      setError(message)
      return
    }
    const emptyRequirement = opportunity.requirements.some(
      (item) => !item.text.trim(),
    )
    if (emptyRequirement) {
      setError(
        'Add a description or remove each blank requirement before confirming.',
      )
      return
    }
    setBusy(true)
    setError('')
    try {
      await jobApi.confirm(opportunity)
      await navigate({ to: '/jobs/$jobId', params: { jobId: opportunity.id } })
    } catch (issue) {
      setError((issue as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return {
    opportunity,
    loading,
    busy,
    error,
    urlError,
    updateDetails,
    updateRequirement,
    addRequirement,
    removeRequirement,
    confirm,
  }
}

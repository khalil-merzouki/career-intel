import type {
  JobOpportunity,
  JobOpportunityInput,
  MatchAnalysis,
  RecruiterMatch,
} from '../types'

async function read<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Something went wrong. Please try again.')
  }
  return response.json() as Promise<T>
}

export const jobApi = {
  list: () =>
    fetch('/api/jobs').then((response) => read<JobOpportunity[]>(response)),
  get: (id: string) =>
    fetch(`/api/jobs/${encodeURIComponent(id)}`).then((response) =>
      read<JobOpportunity>(response),
    ),
  match: (id: string) =>
    fetch(`/api/jobs/${encodeURIComponent(id)}/match`).then((response) =>
      read<MatchAnalysis>(response),
    ),
  evaluateMatch: (id: string) =>
    fetch(`/api/jobs/${encodeURIComponent(id)}/evaluate-match`, { method: 'POST' }).then((response) => read<RecruiterMatch>(response)),
  save: (opportunity: JobOpportunity) =>
    fetch(`/api/jobs/${encodeURIComponent(opportunity.id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes: opportunity.notes,
        trackingStatus: opportunity.trackingStatus,
      }),
    }).then((response) => read<JobOpportunity>(response)),
  analyze: (input: JobOpportunityInput) =>
    fetch('/api/jobs/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }).then((response) => read<JobOpportunity>(response)),
  confirm: (opportunity: JobOpportunity) =>
    fetch(`/api/jobs/${encodeURIComponent(opportunity.id)}/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opportunity),
    }).then((response) => read<JobOpportunity>(response)),
}

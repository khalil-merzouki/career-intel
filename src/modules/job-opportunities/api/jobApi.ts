import type { JobOpportunity, JobOpportunityInput } from '../types'

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

import type {
  Application,
  ApplicationSource,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '../types'

async function read<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Something went wrong. Please try again.')
  }
  return response.json() as Promise<T>
}

export const applicationApi = {
  list: () =>
    fetch('/api/applications').then((response) =>
      read<Application[]>(response),
    ),
  get: (id: string) =>
    fetch(`/api/applications/${encodeURIComponent(id)}`).then((response) =>
      read<Application>(response),
    ),
  forJob: (jobId: string) =>
    fetch(`/api/applications/by-job/${encodeURIComponent(jobId)}`).then(
      (response) => read<Application | null>(response),
    ),
  source: (jobId: string) =>
    fetch(`/api/applications/source/${encodeURIComponent(jobId)}`).then(
      (response) => read<ApplicationSource>(response),
    ),
  create: (input: CreateApplicationInput) =>
    fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }).then((response) => read<Application>(response)),
  update: (id: string, input: UpdateApplicationInput) =>
    fetch(`/api/applications/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }).then((response) => read<Application>(response)),
}

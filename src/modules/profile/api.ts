import type { Profile } from './types'

async function read<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || 'Something went wrong. Please try again.')
  }
  return response.json() as Promise<T>
}

export const profileApi = {
  get: () => fetch('/api/profile').then((response) => read<Profile>(response)),
  reset: () =>
    fetch('/api/profile/reset', { method: 'POST' }).then((response) =>
      read<Profile>(response),
    ),
  save: (profile: Profile) =>
    fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    }).then((response) => read<Profile>(response)),
  importCv: (file: File) => {
    const body = new FormData()
    body.append('file', file)
    return fetch('/api/profile/import', { method: 'POST', body }).then(
      (response) => read<Profile>(response),
    )
  },
}

import type { DashboardSummary } from '../types'

export const dashboardApi = {
  get: async (): Promise<DashboardSummary> => {
    const response = await fetch('/api/dashboard')
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Unable to load your dashboard.')
    }
    return response.json() as Promise<DashboardSummary>
  },
}

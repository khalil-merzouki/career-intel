import type { ApplicationStage } from './types'

export const applicationStages: {
  value: ApplicationStage
  label: string
  active: boolean
}[] = [
  { value: 'applied', label: 'Applied', active: true },
  { value: 'recruiter-screening', label: 'Recruiter screening', active: true },
  { value: 'technical-interview', label: 'Technical interview', active: true },
  { value: 'final-interview', label: 'Final interview', active: true },
  { value: 'offer', label: 'Offer', active: true },
  { value: 'accepted', label: 'Accepted', active: false },
  { value: 'rejected', label: 'Rejected', active: false },
  { value: 'withdrawn', label: 'Withdrawn', active: false },
]

export function stageLabel(stage: string) {
  return applicationStages.find((item) => item.value === stage)?.label ?? stage
}

export function isActiveStage(stage: string) {
  return applicationStages.find((item) => item.value === stage)?.active ?? false
}

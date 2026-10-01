import type { JobOpportunityInput } from '../types'

export const MIN_JOB_DESCRIPTION_CHARACTERS = 100

export function isValidJobUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function validateJobCapture(input: JobOpportunityInput) {
  if (input.description.trim().length < MIN_JOB_DESCRIPTION_CHARACTERS) {
    return `Paste at least ${MIN_JOB_DESCRIPTION_CHARACTERS} characters from the job description.`
  }
  if (input.url.trim() && !isValidJobUrl(input.url.trim())) {
    return 'Enter a valid job URL beginning with http:// or https://.'
  }
  return ''
}

const monthYearPattern = /^(0[1-9]|1[0-2])\/\d{4}$/

export function splitPeriod(value: string) {
  const parts = value.split(/\s*[–-]\s*/)
  return { start: parts[0] ?? '', end: parts[1] ?? '' }
}

export function validateExperiencePeriod(value: string): string | null {
  const { start, end } = splitPeriod(value)
  if (!monthYearPattern.test(start)) return 'Enter a start date as MM/YYYY.'
  if (end !== 'present' && !monthYearPattern.test(end)) {
    return 'Enter an end date as MM/YYYY or present.'
  }

  if (end !== 'present') {
    const [startMonth, startYear] = start.split('/').map(Number)
    const [endMonth, endYear] = end.split('/').map(Number)
    if (endYear * 12 + endMonth < startYear * 12 + startMonth) {
      return 'The end date must be on or after the start date.'
    }
  }

  return null
}

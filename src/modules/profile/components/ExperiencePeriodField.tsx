import { useId, useRef, useState, type ChangeEvent } from 'react'
import { splitPeriod, validateExperiencePeriod } from '../hooks/datePeriod'

function formatMonthYear(raw: string, previous: string, inputType?: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 6)

  // Keep the slash fixed during entry, while allowing Backspace to cross it.
  if (
    inputType === 'deleteContentBackward' &&
    previous.endsWith('/') &&
    raw === previous.slice(0, -1)
  ) {
    return digits.slice(0, -1)
  }

  return digits.length >= 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits
}

function formatEnd(raw: string, previous: string, inputType?: string) {
  if (/[a-z]/i.test(raw)) return raw.trim().toLowerCase().slice(0, 7)
  return formatMonthYear(raw, previous, inputType)
}

export function ExperiencePeriodField({
  value,
  onChange,
  index,
  showErrors,
}: {
  value: string
  onChange: (value: string) => void
  index: number
  showErrors: boolean
}) {
  const { start, end } = splitPeriod(value)
  const [touched, setTouched] = useState(false)
  const endInput = useRef<HTMLInputElement>(null)
  const id = useId()
  const error = validateExperiencePeriod(value)
  const visibleError = (touched || showErrors) && error

  function changeStart(event: ChangeEvent<HTMLInputElement>) {
    const inputType = (event.nativeEvent as InputEvent).inputType
    const next = formatMonthYear(event.target.value, start, inputType)
    onChange(`${next} - ${end}`)
    if (next.length === 7 && start.length < 7) {
      endInput.current?.focus()
      endInput.current?.setSelectionRange(end.length, end.length)
    }
  }

  function changeEnd(event: ChangeEvent<HTMLInputElement>) {
    const inputType = (event.nativeEvent as InputEvent).inputType
    onChange(`${start} - ${formatEnd(event.target.value, end, inputType)}`)
  }

  return (
    <div className="field period-field">
      <span id={`${id}-label`}>Dates</span>
      <div
        className={`period-control${visibleError ? ' invalid' : ''}`}
        role="group"
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-hint${visibleError ? ` ${id}-error` : ''}`}
      >
        <input
          aria-label={`Start date for experience ${index + 1}`}
          aria-invalid={Boolean(visibleError)}
          inputMode="numeric"
          autoComplete="off"
          placeholder="MM/YYYY"
          value={start}
          onChange={changeStart}
        />
        <span className="period-divider" aria-hidden="true">
          –
        </span>
        <input
          ref={endInput}
          aria-label={`End date for experience ${index + 1}`}
          aria-invalid={Boolean(visibleError)}
          inputMode="text"
          autoComplete="off"
          placeholder="MM/YYYY or present"
          value={end}
          onChange={changeEnd}
          onBlur={() => setTouched(true)}
        />
      </div>
      <small id={`${id}-hint`}>
        MM/YYYY – MM/YYYY, or use “present” for a current role.
      </small>
      {visibleError && (
        <small id={`${id}-error`} className="field-error" role="alert">
          {visibleError}
        </small>
      )}
    </div>
  )
}

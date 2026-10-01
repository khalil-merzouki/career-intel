export interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  type?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  id?: string
  className?: string
  error?: string
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
  required = false,
  multiline = false,
  rows = 5,
  id,
  className,
  error,
}: FieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const descriptionIds = [
    hint ? `${fieldId}-hint` : '',
    error ? `${fieldId}-error` : '',
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <label className={`field${className ? ` ${className}` : ''}`}>
      <span>
        {label}
        {required && <b aria-hidden="true"> *</b>}
      </span>
      {multiline ? (
        <textarea
          id={fieldId}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={descriptionIds || undefined}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={descriptionIds || undefined}
        />
      )}
      {hint && <small id={`${fieldId}-hint`}>{hint}</small>}
      {error && (
        <small className="field-error" id={`${fieldId}-error`}>
          {error}
        </small>
      )}
    </label>
  )
}

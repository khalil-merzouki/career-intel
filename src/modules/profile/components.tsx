import { ArrowLeft, ArrowRight, Check, CircleHelp } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useProfile } from './profileContext'

export function StepLayout({
  step,
  total,
  showProgress = true,
  progressLabel,
  eyebrow,
  title,
  description,
  children,
  aside,
  back,
  next,
  nextLabel = 'Continue',
  onNext,
  busy = false,
}: {
  step: number
  total: number
  showProgress?: boolean
  progressLabel?: string
  eyebrow?: string
  title: string
  description: string
  children: ReactNode
  aside?: ReactNode
  back?: string
  next?: string
  nextLabel?: string
  onNext?: () => void
  busy?: boolean
}) {
  const { error } = useProfile()
  return (
    <div className="step-page">
      <div className="step-topline">
        <Link to="/" className="brand" aria-label="Career Intel home">
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          career intel
        </Link>
        {showProgress && (
          <div
            className="step-progress"
            aria-label={progressLabel ?? `Step ${step} of ${total}`}
          >
            <span>{progressLabel ?? `Step ${step} of ${total}`}</span>
            {!progressLabel && (
              <div className="progress-dots" aria-hidden="true">
                {Array.from({ length: total }, (_, index) => (
                  <i key={index} className={index < step ? 'active' : ''} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <main className="step-content">
        <div className="step-main">
          <p className="eyebrow">{eyebrow ?? 'PROFILE SETUP'}</p>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
          {error && (
            <p className="inline-error" role="alert">
              {error}
            </p>
          )}
          {children}
        </div>
        {aside && <aside className="step-aside">{aside}</aside>}
      </main>
      {(back || next || onNext) && (
        <footer className="step-footer">
          {back ? (
            <Link to={back} className="button button-quiet">
              <ArrowLeft size={17} /> Back
            </Link>
          ) : (
            <span />
          )}
          {onNext ? (
            <button
              type="button"
              className="button button-primary"
              onClick={onNext}
              disabled={busy}
            >
              {busy ? 'Please wait…' : nextLabel}
              <ArrowRight size={18} />
            </button>
          ) : next ? (
            <Link to={next} className="button button-primary">
              {nextLabel}
              <ArrowRight size={18} />
            </Link>
          ) : null}
        </footer>
      )}
    </div>
  )
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <b aria-hidden="true"> *</b>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
      />
      {hint && <small>{hint}</small>}
    </label>
  )
}

export function ProfileCharacter({
  variant = 'document',
}: {
  variant?: 'document' | 'orbit'
}) {
  return (
    <svg
      className="profile-character"
      viewBox="0 0 270 240"
      role="img"
      aria-label="A friendly geometric character"
    >
      <circle cx="127" cy="119" r="98" fill="#f1f0ef" />
      <circle cx="207" cy="38" r="7" fill="#6f9634" />
      <circle cx="237" cy="88" r="4" fill="#1d7656" />
      <path
        d="M40 67c55-63 159-56 191 19"
        fill="none"
        stroke="#a7c2ad"
        strokeDasharray="4 7"
      />
      <path
        d="M83 189L124 52c4-13 22-13 26 0l42 137c3 11-5 20-16 20H99c-11 0-19-9-16-20Z"
        fill="#1d7656"
      />
      <circle cx="124" cy="143" r="4" fill="white" />
      <circle cx="150" cy="143" r="4" fill="white" />
      <path
        d="M128 160q9 9 18 0"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M99 207l-11 23M172 207l13 23M89 163l-24-14M185 163l21-17"
        stroke="#153c2c"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {variant === 'document' ? (
        <g transform="rotate(12 210 116)">
          <rect
            x="188"
            y="80"
            width="52"
            height="69"
            rx="5"
            fill="white"
            stroke="#aac7b5"
            strokeWidth="3"
          />
          <path
            d="M198 101h31M198 112h31M198 123h23"
            stroke="#aac7b5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <>
          <circle cx="219" cy="113" r="17" fill="#6f9634" />
          <circle cx="219" cy="113" r="7" fill="#1d7656" />
        </>
      )}
    </svg>
  )
}

export function InfoAside({
  title,
  text,
  variant,
}: {
  title: string
  text: string
  variant?: 'document' | 'orbit'
}) {
  return (
    <div className="info-aside">
      <ProfileCharacter variant={variant} />
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="accent-line" />
    </div>
  )
}

export function ReviewRow({
  icon,
  title,
  children,
  to,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
  to?: string
}) {
  return (
    <section className="review-row">
      <span className="row-icon">{icon}</span>
      <div className="row-body">
        <h3>{title}</h3>
        {children}
      </div>
      {to && (
        <Link to={to} className="edit-link" aria-label={`Edit ${title}`}>
          Edit <ArrowRight size={15} />
        </Link>
      )}
    </section>
  )
}

export function SummaryCheck({ children }: { children: ReactNode }) {
  return (
    <span className="summary-check">
      <Check size={15} />
      {children}
    </span>
  )
}

export function HelpText({ children }: { children: ReactNode }) {
  return (
    <p className="help-text">
      <CircleHelp size={16} />
      {children}
    </p>
  )
}

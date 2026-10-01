import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export interface StepLayoutProps {
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
  error?: string
}

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
  error,
}: StepLayoutProps) {
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
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
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

import './styles.css'
import { Link, useParams } from '@tanstack/react-router'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
} from 'lucide-react'
import { StepLayout } from '../../../../shared/components'
import { useApplicationConversion } from '../../hooks/useApplicationConversion'

export function ConvertApplicationView() {
  const params = useParams({ strict: false })
  const jobId = String(params.jobId ?? '')
  const conversion = useApplicationConversion(jobId)
  const source = conversion.source
  return (
    <StepLayout
      step={1}
      total={1}
      showProgress={false}
      eyebrow="APPLICATIONS"
      title="Track this application"
      description="Create an application record when you’ve submitted to this opportunity."
      back="/jobs"
      onNext={source && !conversion.existing ? conversion.create : undefined}
      nextLabel="Create application"
      busy={conversion.busy}
      error={conversion.error}
    >
      {conversion.loading ? (
        <p className="job-loading" role="status">
          Loading opportunity…
        </p>
      ) : !source ? (
        <section className="form-panel">
          <p>The opportunity could not be found.</p>
        </section>
      ) : (
        <div className="form-stack">
          <section className="form-panel application-convert-source">
            <span className="application-source-icon">
              <BriefcaseBusiness size={23} />
            </span>
            <p className="detail-kicker">SAVED OPPORTUNITY</p>
            <h2>{source.role || 'Untitled role'}</h2>
            <p>
              {[source.company, source.location].filter(Boolean).join(' · ') ||
                'Job details not provided'}
            </p>
            <Link
              to="/jobs/$jobId"
              params={{ jobId: source.id }}
              className="edit-link"
            >
              View job analysis <ArrowRight size={15} />
            </Link>
          </section>
          {conversion.existing ? (
            <section className="form-panel application-existing">
              <CheckCircle2 size={25} aria-hidden="true" />
              <div>
                <h2>Already tracked</h2>
                <p>
                  This opportunity already has an application record. Continue
                  there to update its stage, dates, or notes.
                </p>
                <Link
                  to="/applications/$applicationId"
                  params={{ applicationId: conversion.existing.id }}
                  className="button button-primary"
                >
                  Open application <ArrowRight size={16} />
                </Link>
              </div>
            </section>
          ) : (
            <section className="form-panel">
              <div className="panel-heading">
                <span className="section-number">
                  <CalendarDays size={18} />
                </span>
                <div>
                  <h2>Application date</h2>
                  <p>
                    Record when you submitted your application. You can edit it
                    later.
                  </p>
                </div>
              </div>
              <label className="field application-date-field">
                <span>Date applied *</span>
                <input
                  type="date"
                  required
                  value={conversion.appliedOn}
                  onChange={(event) =>
                    conversion.setAppliedOn(event.target.value)
                  }
                />
              </label>
              <p className="application-helper">
                We’ll start your application at the Applied stage. You can add
                interviews and upcoming dates next.
              </p>
            </section>
          )}
        </div>
      )}
    </StepLayout>
  )
}

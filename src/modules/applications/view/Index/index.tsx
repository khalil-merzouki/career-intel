import './styles.css'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BriefcaseBusiness, CalendarDays } from 'lucide-react'
import { StepLayout } from '../../../../shared/components'
import { StageBadge } from '../../components/StageBadge'
import { useApplications } from '../../hooks/useApplications'

export function ApplicationsView() {
  const listing = useApplications()
  return (
    <StepLayout
      step={1}
      total={1}
      showProgress={false}
      eyebrow="APPLICATIONS"
      title="Your applications"
      description="Follow each application from submission through interviews and decisions."
      back="/"
    >
      <div className="applications-top-actions">
        <Link to="/jobs" className="button button-quiet">
          <BriefcaseBusiness size={17} /> Browse opportunities
        </Link>
      </div>
      <div
        className="application-tabs"
        role="group"
        aria-label="Application status"
      >
        <button
          type="button"
          className={listing.filter === 'active' ? 'selected' : ''}
          aria-pressed={listing.filter === 'active'}
          onClick={() => listing.setFilter('active')}
        >
          Active <span>{listing.activeCount}</span>
        </button>
        <button
          type="button"
          className={listing.filter === 'closed' ? 'selected' : ''}
          aria-pressed={listing.filter === 'closed'}
          onClick={() => listing.setFilter('closed')}
        >
          Closed <span>{listing.closedCount}</span>
        </button>
      </div>
      {listing.error && (
        <p className="inline-error" role="alert">
          {listing.error}
        </p>
      )}
      {listing.loading ? (
        <p className="job-loading" role="status">
          Loading applications…
        </p>
      ) : listing.visibleCount === 0 ? (
        <section className="form-panel application-empty">
          <span className="job-empty-icon">
            <BriefcaseBusiness size={24} />
          </span>
          <h2>
            {listing.filter === 'active'
              ? 'No active applications yet'
              : 'No closed applications'}
          </h2>
          <p>
            {listing.filter === 'active'
              ? 'Open a saved opportunity and choose Track application after you submit.'
              : 'Applications you accept, withdraw, or mark rejected will appear here.'}
          </p>
          {listing.filter === 'active' && (
            <Link to="/jobs" className="button button-primary">
              View opportunities <ArrowRight size={16} />
            </Link>
          )}
        </section>
      ) : (
        <div className="application-stage-list">
          {listing.groups.map((stage) => {
            const items = stage.applications
            return (
              <section
                className="application-stage-section"
                key={stage.value}
                aria-label={stage.label}
              >
                <h2>
                  {stage.label} <span>{items.length}</span>
                </h2>
                <div className="application-cards">
                  {items.map((item) => {
                    const upcoming = item.upcoming
                    return (
                      <article className="application-card" key={item.id}>
                        <div className="application-card-main">
                          <div>
                            <h3>{item.role || 'Untitled role'}</h3>
                            <p>
                              {[item.company, item.location]
                                .filter(Boolean)
                                .join(' · ') || 'Job details not provided'}
                            </p>
                          </div>
                          <StageBadge stage={item.stage} />
                        </div>
                        <div className="application-card-meta">
                          <span>Applied {item.appliedOn}</span>
                          {upcoming && (
                            <span>
                              <CalendarDays size={14} /> {upcoming.label} ·{' '}
                              {upcoming.date}
                            </span>
                          )}
                        </div>
                        <Link
                          to="/applications/$applicationId"
                          params={{ applicationId: item.id }}
                          className="edit-link"
                        >
                          View application <ArrowRight size={15} />
                        </Link>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </StepLayout>
  )
}

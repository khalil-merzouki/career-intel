import './styles.css'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CircleAlert,
  Layers3,
  Sparkles,
} from 'lucide-react'
import { StepLayout } from '../../../shared/components'
import { DashboardDate } from '../components/DashboardDate'
import { DashboardPanel } from '../components/DashboardPanel'
import { useDashboard } from '../hooks/useDashboard'

export function DashboardView() {
  const { summary, loading, error } = useDashboard()
  return (
    <StepLayout
      step={1}
      total={1}
      showProgress={false}
      eyebrow="YOUR OVERVIEW"
      title="Your search at a glance"
      description="A clear view of current applications, promising roles, and what needs attention next."
      error={error}
    >
      <nav className="dashboard-shortcuts" aria-label="Explore Career Intel">
        <Link to="/profile">
          Career Profile <ArrowUpRight size={15} />
        </Link>
        <Link to="/jobs">
          Opportunities <ArrowUpRight size={15} />
        </Link>
        <Link to="/applications">
          Applications <ArrowUpRight size={15} />
        </Link>
        <Link to="/insights">
          Career insights <ArrowUpRight size={15} />
        </Link>
      </nav>
      {loading ? (
        <p className="dashboard-loading" role="status">
          Loading your dashboard…
        </p>
      ) : summary ? (
        <>
          <section className="dashboard-status" aria-label="Job search status">
            <Link to="/applications" className="dashboard-stat">
              <span className="dashboard-stat-icon">
                <BriefcaseBusiness size={19} />
              </span>
              <strong>{summary.activeApplicationCount}</strong>
              <span>Active applications</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/jobs" className="dashboard-stat">
              <span className="dashboard-stat-icon">
                <Layers3 size={19} />
              </span>
              <strong>{summary.savedOpportunityCount}</strong>
              <span>Saved opportunities</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="#upcoming-interviews" className="dashboard-stat">
              <span className="dashboard-stat-icon">
                <CalendarDays size={19} />
              </span>
              <strong>{summary.upcomingInterviewCount}</strong>
              <span>Upcoming interviews</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </section>
          <section
            className="dashboard-focus"
            aria-labelledby="dashboard-focus-title"
          >
            <span className="dashboard-focus-mark">
              <Sparkles size={20} aria-hidden="true" />
            </span>
            <div>
              <p>FOCUS NOW</p>
              <h2 id="dashboard-focus-title">{summary.focus.title}</h2>
              <span>{summary.focus.description}</span>
            </div>
            {summary.focus.kind === 'application' ? (
              <Link
                to="/applications/$applicationId"
                params={{ applicationId: summary.focus.applicationId }}
                className="button button-primary"
              >
                Open application <ArrowRight size={16} />
              </Link>
            ) : (
              <Link to={summary.focus.href} className="button button-primary">
                Take a look <ArrowRight size={16} />
              </Link>
            )}
          </section>
          <div className="dashboard-grid">
            <DashboardPanel
              id="active-applications"
              title="Active applications"
              description="Where your ongoing conversations stand."
              action={
                <Link to="/applications" className="dashboard-section-link">
                  View all <ArrowRight size={15} />
                </Link>
              }
            >
              {summary.activeApplications.length ? (
                <ul className="dashboard-list">
                  {summary.activeApplications.map((application) => (
                    <li key={application.id}>
                      <Link
                        to="/applications/$applicationId"
                        params={{ applicationId: application.id }}
                        className="dashboard-list-link"
                      >
                        <span>
                          <strong>{application.role || 'Untitled role'}</strong>
                          <small>
                            {application.company || 'Company not specified'}
                          </small>
                        </span>
                        <span className="dashboard-stage">
                          {application.stageLabel}
                        </span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="dashboard-empty">
                  <p>
                    No active applications yet. Track a saved opportunity after
                    you submit.
                  </p>
                  <Link to="/jobs">
                    Explore opportunities <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </DashboardPanel>
            <DashboardPanel
              id="upcoming-interviews"
              title="Upcoming interviews"
              description="Scheduled conversations on the horizon."
              action={
                <Link to="/applications" className="dashboard-section-link">
                  View all <ArrowRight size={15} />
                </Link>
              }
            >
              {summary.upcomingInterviews.length ? (
                <ul className="dashboard-list dashboard-interview-list">
                  {summary.upcomingInterviews.map((interview) => (
                    <li key={`${interview.applicationId}-${interview.id}`}>
                      <Link
                        to="/applications/$applicationId"
                        params={{ applicationId: interview.applicationId }}
                        className="dashboard-list-link"
                      >
                        <DashboardDate date={interview.date} />
                        <span>
                          <strong>{interview.title}</strong>
                          <small>
                            {interview.role || 'Untitled role'}
                            {interview.company ? ` · ${interview.company}` : ''}
                          </small>
                        </span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="dashboard-empty">
                  <p>
                    No interviews are scheduled. Add dates to an application as
                    plans are confirmed.
                  </p>
                  <Link to="/applications">
                    View applications <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </DashboardPanel>
            <DashboardPanel
              id="best-aligned"
              title="Best-aligned opportunities"
              description="Ranked by explicit profile evidence across confirmed criteria."
              action={
                <Link to="/jobs" className="dashboard-section-link">
                  View all <ArrowRight size={15} />
                </Link>
              }
            >
              {summary.bestAlignedOpportunities.length ? (
                <ul className="dashboard-list dashboard-opportunity-list">
                  {summary.bestAlignedOpportunities.map((opportunity) => (
                    <li key={opportunity.id}>
                      <Link
                        to="/jobs/$jobId"
                        params={{ jobId: opportunity.id }}
                        className="dashboard-list-link"
                      >
                        <span>
                          <strong>{opportunity.role || 'Untitled role'}</strong>
                          <small>
                            {[opportunity.company, opportunity.location]
                              .filter(Boolean)
                              .join(' · ') || 'Job details not provided'}
                          </small>
                          <em>
                            {opportunity.documentedMatches} of{' '}
                            {opportunity.comparedItems}{' '}
                            {opportunity.comparedItems === 1
                              ? 'criterion'
                              : 'criteria'}{' '}
                            aligned
                            {opportunity.partialMatches
                              ? ` · ${opportunity.partialMatches} partial`
                              : ''}
                            {opportunity.reviewItems
                              ? ` · ${opportunity.reviewItems} to review`
                              : ''}
                          </em>
                        </span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="dashboard-empty">
                  <p>
                    {!summary.profileReady
                      ? 'Complete your Career Profile to compare it with saved roles.'
                      : summary.analyzedOpportunityCount === 0
                        ? 'Confirm an opportunity analysis to see how your profile aligns.'
                        : 'Your confirmed opportunities have no criteria to compare yet.'}
                  </p>
                  <Link to={!summary.profileReady ? '/profile' : '/jobs'}>
                    {!summary.profileReady
                      ? 'Open profile'
                      : 'View opportunities'}{' '}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </DashboardPanel>
            <DashboardPanel
              id="recurring-gaps"
              title="Top recurring gaps"
              description="Undocumented skills appearing in multiple confirmed roles."
              action={
                <Link
                  to="/profile/setup/skills"
                  className="dashboard-section-link"
                >
                  Review skills <ArrowRight size={15} />
                </Link>
              }
            >
              {summary.recurringGaps.length ? (
                <ul className="dashboard-list dashboard-gaps">
                  {summary.recurringGaps.map((gap) => (
                    <li key={gap.name.toLocaleLowerCase()}>
                      <span className="dashboard-gap-icon">
                        <CircleAlert size={17} aria-hidden="true" />
                      </span>
                      <span>
                        <strong>{gap.name}</strong>
                        <small>
                          {gap.opportunityCount} opportunities
                          {gap.requiredCount
                            ? ` · required in ${gap.requiredCount}`
                            : ''}
                        </small>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="dashboard-empty">
                  <p>
                    {!summary.profileReady
                      ? 'Complete your Career Profile to identify recurring skill gaps.'
                      : summary.analyzedOpportunityCount < 2
                        ? 'Add and confirm more opportunities to spot recurring skill gaps.'
                        : 'No undocumented skill appears across multiple confirmed roles.'}
                  </p>
                  <Link to={!summary.profileReady ? '/profile' : '/jobs'}>
                    {!summary.profileReady
                      ? 'Open profile'
                      : 'View opportunities'}{' '}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
              <p className="dashboard-evidence-note">
                Undocumented means the skill is not recorded in your profile; it
                does not mean you lack it.
              </p>
            </DashboardPanel>
          </div>
          <Link to="/modules" className="dashboard-module-link">
            Explore all views <ArrowRight size={15} />
          </Link>
        </>
      ) : null}
    </StepLayout>
  )
}

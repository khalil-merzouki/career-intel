import './styles.css'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BriefcaseBusiness, Plus, Sparkles } from 'lucide-react'
import { InfoAside, StepLayout } from '../../../../shared/components'
import { useJobList } from '../../hooks/useJobList'

export function JobOpportunitiesView() {
  const { opportunities, loading, error } = useJobList()
  return (
    <StepLayout
      step={1}
      total={1}
      showProgress={false}
      eyebrow="CAREER INTEL"
      title="Job opportunities"
      description="Keep roles you’re considering in one place and turn each description into clear, reviewable criteria."
      aside={
        <InfoAside
          title="Make each opportunity easier to assess."
          text="Compare the role’s requirements with your experience after you’ve verified the analysis."
          variant="orbit"
        />
      }
    >
      <div className="job-list-actions">
        <Link to="/jobs/new" className="button button-primary">
          <Plus size={18} /> Add job opportunity
        </Link>
      </div>
      {error && (
        <p className="inline-error" role="alert">
          {error}
        </p>
      )}
      {loading ? (
        <p className="job-loading" role="status">
          Loading your opportunities…
        </p>
      ) : opportunities.length === 0 ? (
        <div className="job-empty-state">
          <span className="job-empty-icon">
            <BriefcaseBusiness size={25} />
          </span>
          <h2>No opportunities saved yet</h2>
          <p>
            Add a job description to see its requirements organized in one
            place.
          </p>
          <Link to="/jobs/new" className="button button-quiet">
            Add your first opportunity <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <div className="job-opportunity-list">
          {opportunities.map((opportunity) => (
            <article className="job-opportunity-card" key={opportunity.id}>
              <div className="job-opportunity-mark">
                <Sparkles size={20} />
              </div>
              <div className="job-opportunity-body">
                <div className="job-card-heading">
                  <div>
                    <h2>{opportunity.role || 'Untitled role'}</h2>
                    <p>
                      {[
                        opportunity.company,
                        opportunity.location,
                        opportunity.workType,
                      ]
                        .filter(Boolean)
                        .join(' · ') || 'Job details not provided'}
                    </p>
                  </div>
                  <span
                    className={`job-status ${opportunity.status === 'draft' && opportunity.trackingStatus === 'saved' ? 'draft' : opportunity.trackingStatus}`}
                  >
                    {opportunity.trackingStatus === 'archived'
                      ? 'Archived'
                      : opportunity.trackingStatus === 'applied'
                        ? 'Applied'
                        : opportunity.status === 'confirmed'
                          ? 'Confirmed'
                          : 'Needs review'}
                  </span>
                </div>
                {opportunity.salary && (
                  <p className="job-salary">{opportunity.salary}</p>
                )}
                <div className="job-card-footer">
                  <span>
                    {opportunity.requirements.length} extracted requirements
                  </span>
                  <Link
                    to={
                      opportunity.status === 'confirmed'
                        ? '/jobs/$jobId'
                        : '/jobs/$jobId/review'
                    }
                    params={{ jobId: opportunity.id }}
                    className="edit-link"
                  >
                    {opportunity.status === 'confirmed'
                      ? 'View opportunity'
                      : 'Review analysis'}{' '}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </StepLayout>
  )
}

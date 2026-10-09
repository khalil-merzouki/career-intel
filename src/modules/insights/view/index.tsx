import './styles.css'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleAlert,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { StepLayout } from '../../../shared/components'
import type { InsightsSummary, SkillInsight } from '../types'

const alignmentLabels: Record<SkillInsight['alignment'], string> = {
  strong: 'Documented strength',
  partial: 'Some evidence',
  gap: 'Not documented',
  unassessed: 'Profile needed',
}

export function InsightsView() {
  const [summary, setSummary] = useState<InsightsSummary | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/insights', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok)
          throw new Error('Unable to load your career insights.')
        return response.json() as Promise<InsightsSummary>
      })
      .then(setSummary)
      .catch((issue: Error) => {
        if (issue.name !== 'AbortError') setError(issue.message)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <StepLayout
      step={1}
      total={1}
      showProgress={false}
      eyebrow="CAREER INSIGHTS"
      title="What your target roles are asking for"
      description="Spot recurring requirements, document your strengths, and choose where to grow next."
      back="/"
      error={error}
    >
      {loading ? (
        <p className="job-loading" role="status">
          Loading insights…
        </p>
      ) : summary ? (
        <div className="insights-stack">
          <section className="insights-overview" aria-label="Analysis scope">
            <div>
              <strong>{summary.analyzedOpportunityCount}</strong>
              <span>Confirmed opportunities</span>
            </div>
            <div>
              <strong>{summary.applicationCount}</strong>
              <span>Related applications</span>
            </div>
            <div>
              <strong>{summary.skillDemand.length}</strong>
              <span>Distinct skills requested</span>
            </div>
          </section>
          {!summary.profileReady && (
            <div className="insights-notice">
              <CircleAlert size={19} aria-hidden="true" />
              <p>
                Complete your profile to assess strengths and gaps against these
                requirements.
              </p>
              <Link to="/profile">
                Open profile <ArrowRight size={15} />
              </Link>
            </div>
          )}
          {summary.analyzedOpportunityCount === 0 ? (
            <section className="form-panel insights-empty">
              <BriefcaseBusiness size={28} aria-hidden="true" />
              <h2>Start with a confirmed opportunity</h2>
              <p>
                Review a job analysis to add its requirements to your market
                view.
              </p>
              <Link to="/jobs" className="button button-primary">
                View opportunities <ArrowRight size={16} />
              </Link>
            </section>
          ) : (
            <>
              <section className="form-panel" aria-labelledby="priority-title">
                <div className="insights-heading">
                  <TrendingUp size={21} />
                  <div>
                    <p className="detail-kicker">DEVELOPMENT PRIORITIES</p>
                    <h2 id="priority-title">High-value skills</h2>
                  </div>
                </div>
                <p className="insights-intro">
                  Prioritized by how often a skill is required and whether it
                  appears in a role you applied to. These are opportunities to
                  add evidence or develop a skill, not guarantees of a job
                  match.
                </p>
                {summary.highValueSkills.length ? (
                  <div className="insights-card-grid">
                    {summary.highValueSkills.map((skill) => (
                      <article
                        className="insights-skill-card"
                        key={skill.name.toLocaleLowerCase()}
                      >
                        <div className="insights-card-title">
                          <h3>{skill.name}</h3>
                          <span
                            className={`insights-alignment ${skill.alignment}`}
                          >
                            {alignmentLabels[skill.alignment]}
                          </span>
                        </div>
                        <p>{skill.impact}</p>
                        <div className="insights-card-meta">
                          <span>
                            {skill.opportunityCount}{' '}
                            {skill.opportunityCount === 1 ? 'role' : 'roles'}
                          </span>
                          <span>{skill.requiredCount} required</span>
                          {skill.applicationCount > 0 && (
                            <span>{skill.applicationCount} applied</span>
                          )}
                        </div>
                        <div className="insights-card-actions">
                          <Link to="/profile/setup/skills">
                            Review profile <ArrowRight size={14} />
                          </Link>
                          {skill.jobIds[0] && (
                            <Link
                              to="/jobs/$jobId"
                              params={{ jobId: skill.jobIds[0] }}
                            >
                              See a related role <ArrowRight size={14} />
                            </Link>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="insights-empty-copy">
                    No skill gaps identified from confirmed requirements. Keep
                    your profile current as you add roles.
                  </p>
                )}
              </section>
              <section className="form-panel" aria-labelledby="demand-title">
                <div className="insights-heading">
                  <BriefcaseBusiness size={21} />
                  <div>
                    <p className="detail-kicker">MARKET SIGNALS</p>
                    <h2 id="demand-title">Skill demand</h2>
                  </div>
                </div>
                <p className="insights-intro">
                  Each role counts once per skill. Similar wording may appear
                  separately, so review the source jobs for context.
                </p>
                {summary.skillDemand.length ? (
                  <ul className="insights-demand-list">
                    {summary.skillDemand.map((skill) => (
                      <li key={skill.name.toLocaleLowerCase()}>
                        <div>
                          <strong>{skill.name}</strong>
                          <span
                            className={`insights-alignment ${skill.alignment}`}
                          >
                            {alignmentLabels[skill.alignment]}
                          </span>
                        </div>
                        <p>{skill.impact}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="insights-empty-copy">
                    No skill requirements found in these roles.
                  </p>
                )}
              </section>
              <div className="insights-two-column">
                <section
                  className="form-panel"
                  aria-labelledby="strength-title"
                >
                  <div className="insights-heading">
                    <Sparkles size={21} />
                    <div>
                      <p className="detail-kicker">YOUR EVIDENCE</p>
                      <h2 id="strength-title">Documented strengths</h2>
                    </div>
                  </div>
                  {summary.strongSkills.length ? (
                    <ul className="insights-simple-list">
                      {summary.strongSkills.map((skill) => (
                        <li key={skill.name.toLocaleLowerCase()}>
                          <strong>{skill.name}</strong>
                          <p>{skill.impact}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="insights-empty-copy">
                      {summary.profileReady
                        ? 'No requested skills are explicitly documented yet.'
                        : 'Complete your profile to see documented strengths.'}
                    </p>
                  )}
                </section>
                <section
                  className="form-panel"
                  aria-labelledby="recurring-title"
                >
                  <div className="insights-heading">
                    <TrendingUp size={21} />
                    <div>
                      <p className="detail-kicker">REPEATED CRITERIA</p>
                      <h2 id="recurring-title">Recurring requirements</h2>
                    </div>
                  </div>
                  {summary.recurringRequirements.length ? (
                    <ul className="insights-simple-list">
                      {summary.recurringRequirements.map((item) => (
                        <li
                          key={`${item.category}:${item.name.toLocaleLowerCase()}`}
                        >
                          <strong>{item.name}</strong>
                          <p>
                            {item.category} · {item.opportunityCount} roles ·{' '}
                            {item.requiredCount} required
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="insights-empty-copy">
                      No requirement repeats across two confirmed roles yet.
                    </p>
                  )}
                </section>
              </div>
            </>
          )}
          {summary.careerInsights.length > 0 && (
            <section
              className="form-panel"
              aria-labelledby="career-insights-title"
            >
              <div className="insights-heading">
                <Sparkles size={21} />
                <div>
                  <p className="detail-kicker">NEXT STEPS</p>
                  <h2 id="career-insights-title">Personalized insights</h2>
                </div>
              </div>
              <div className="insights-next-list">
                {summary.careerInsights.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.explanation}</p>
                    <Link to={item.href}>
                      Take a look <ArrowRight size={15} />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : null}
    </StepLayout>
  )
}

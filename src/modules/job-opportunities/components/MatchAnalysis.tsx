import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Check, CircleHelp, Minus, SearchX } from 'lucide-react'
import type { MatchAnalysis as MatchAnalysisData, MatchFinding } from '../types'

interface FindingGroupProps {
  title: string
  description: string
  findings: MatchFinding[]
  tone: 'strong' | 'partial' | 'missing' | 'gap'
}

function FindingGroup({
  title,
  description,
  findings,
  tone,
}: FindingGroupProps) {
  const icons = {
    strong: Check,
    partial: Minus,
    missing: SearchX,
    gap: CircleHelp,
  }
  const Icon = icons[tone]
  return (
    <section className={`match-group match-${tone}`} aria-label={title}>
      <header className="match-group-heading">
        <span className="match-group-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <div>
          <h3>
            {title} <span className="match-count">{findings.length}</span>
          </h3>
          <p>{description}</p>
        </div>
      </header>
      {findings.length ? (
        <ul className="match-findings">
          {findings.map((item) => (
            <li key={item.id} className="match-finding">
              <div className="match-finding-title">
                <strong>{item.title}</strong>
                <span>
                  {item.category}
                  {item.priority ? ` · ${item.priority}` : ''}
                </span>
              </div>
              <p>{item.explanation}</p>
              <dl className="match-evidence">
                <div>
                  <dt>Job evidence</dt>
                  <dd>{item.jobEvidence}</dd>
                </div>
                <div>
                  <dt>Profile evidence</dt>
                  <dd>{item.profileEvidence}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      ) : (
        <p className="match-none">No items in this group.</p>
      )}
    </section>
  )
}

interface MatchAnalysisProps {
  analysis: MatchAnalysisData
}

export function MatchAnalysis({ analysis }: MatchAnalysisProps) {
  if (analysis.state === 'job-unconfirmed')
    return (
      <div className="match-unavailable">
        <h3>Confirm the job analysis first</h3>
        <p>
          Review extracted requirements before comparing them with your profile.
        </p>
      </div>
    )
  if (analysis.state === 'profile-incomplete')
    return (
      <div className="match-unavailable">
        <h3>Complete your Career Profile to see alignment</h3>
        <p>
          The comparison needs a confirmed profile so that its evidence is
          meaningful.
        </p>
        <Link to="/profile" className="edit-link">
          Open Career Profile <ArrowUpRight size={15} />
        </Link>
      </div>
    )
  const total =
    analysis.strongMatches.length +
    analysis.partialMatches.length +
    analysis.missingSkills.length +
    analysis.eligibilityGaps.length
  return (
    <>
      <div className="match-overview" aria-label="Match analysis summary">
        <div>
          <strong>{analysis.strongMatches.length}</strong>
          <span>Strong matches</span>
        </div>
        <div>
          <strong>{analysis.partialMatches.length}</strong>
          <span>Partial matches</span>
        </div>
        <div>
          <strong>{analysis.missingSkills.length}</strong>
          <span>Undocumented skills</span>
        </div>
        <div>
          <strong>{analysis.eligibilityGaps.length}</strong>
          <span>Eligibility to review</span>
        </div>
      </div>
      <p className="match-method">
        Compared {total} findings with saved profile entries and confirmed job
        criteria. “Undocumented” means the skill is not recorded in your
        profile; it does not mean you lack it.
      </p>
      <div className="match-groups">
        <FindingGroup
          title="Strong matches"
          description="Explicit profile evidence aligns with the role."
          findings={analysis.strongMatches}
          tone="strong"
        />
        <FindingGroup
          title="Partial matches"
          description="Related evidence exists, but needs your judgment."
          findings={analysis.partialMatches}
          tone="partial"
        />
        <FindingGroup
          title="Missing skills"
          description="Skills requested by the job that are not documented in your profile."
          findings={analysis.missingSkills}
          tone="missing"
        />
        <FindingGroup
          title="Other eligibility gaps"
          description="Work, location, language, credentials, and experience to verify."
          findings={analysis.eligibilityGaps}
          tone="gap"
        />
      </div>
    </>
  )
}

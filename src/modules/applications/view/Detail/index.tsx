import './styles.css'
import { Link, useParams } from '@tanstack/react-router'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ClipboardList,
  Plus,
  Trash2,
} from 'lucide-react'
import { StepLayout } from '../../../../shared/components'
import { StageBadge } from '../../components/StageBadge'
import { useApplicationDetail } from '../../hooks/useApplicationDetail'
import { applicationStages, stageLabel } from '../../stages'
import type { ApplicationStage, InterviewStatus } from '../../types'

export function ApplicationDetailView() {
  const params = useParams({ strict: false })
  const application = useApplicationDetail(String(params.applicationId ?? ''))
  const draft = application.draft
  return (
    <StepLayout
      step={1}
      total={1}
      showProgress={false}
      eyebrow="APPLICATIONS"
      title={draft?.role || 'Application detail'}
      description={
        draft
          ? [draft.company, draft.location].filter(Boolean).join(' · ') ||
            'Track your progress with this role.'
          : 'Track your progress with this role.'
      }
      back="/applications"
      onNext={draft ? application.save : undefined}
      nextLabel="Save changes"
      busy={application.busy}
      error={application.error}
    >
      {application.loading ? (
        <p className="job-loading" role="status">
          Loading application…
        </p>
      ) : !draft ? (
        <section className="form-panel">
          <p>This application could not be found.</p>
        </section>
      ) : (
        <div className="form-stack application-detail-stack">
          <section
            className="form-panel"
            aria-labelledby="application-status-title"
          >
            <div className="application-panel-header">
              <div>
                <p className="detail-kicker">CURRENT PROGRESS</p>
                <h2 id="application-status-title">Application stage</h2>
              </div>
              <StageBadge stage={draft.stage} />
            </div>
            <div className="form-grid application-basic-fields">
              <label className="field">
                <span>Current stage</span>
                <select
                  value={draft.stage}
                  onChange={(event) =>
                    application.setStage(event.target.value as ApplicationStage)
                  }
                >
                  {applicationStages.map((stage) => (
                    <option value={stage.value} key={stage.value}>
                      {stage.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Date applied</span>
                <input
                  type="date"
                  required
                  value={draft.appliedOn}
                  onChange={(event) =>
                    application.setAppliedOn(event.target.value)
                  }
                />
              </label>
            </div>
            <p className="application-helper">
              Changing the stage adds a dated entry to the progress history when
              you save.
            </p>
            <div className="application-progress-history">
              <h3>Progress history</h3>
              <ol>
                {draft.stageHistory.map((event) => (
                  <li key={event.id}>
                    <span>{event.date}</span>
                    <strong>{stageLabel(event.stage)}</strong>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section
            className="form-panel"
            aria-labelledby="important-dates-title"
          >
            <div className="application-panel-header">
              <div>
                <p className="detail-kicker">SCHEDULE</p>
                <h2 id="important-dates-title">Important dates</h2>
              </div>
              <CalendarDays size={20} aria-hidden="true" />
            </div>
            <p className="application-section-copy">
              Keep deadlines, follow-ups, and other milestones together.
            </p>
            <div className="application-entry-list">
              {draft.importantDates.map((item, index) => (
                <div className="application-entry" key={item.id}>
                  <div className="application-entry-heading">
                    <strong>Date {index + 1}</strong>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Remove date ${index + 1}`}
                      onClick={() => application.removeDate(item.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="form-grid">
                    <label className="field">
                      <span>What is happening?</span>
                      <input
                        value={item.label}
                        onChange={(event) =>
                          application.updateDate(item.id, {
                            label: event.target.value,
                          })
                        }
                        placeholder="e.g. Application deadline"
                      />
                    </label>
                    <label className="field">
                      <span>Date</span>
                      <input
                        type="date"
                        value={item.date}
                        onChange={(event) =>
                          application.updateDate(item.id, {
                            date: event.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {draft.importantDates.length === 0 && (
              <p className="application-empty-copy">No dates added yet.</p>
            )}
            <button
              type="button"
              className="add-button application-add"
              onClick={application.addDate}
            >
              <Plus size={17} /> Add date
            </button>
          </section>
          <section className="form-panel" aria-labelledby="interviews-title">
            <div className="application-panel-header">
              <div>
                <p className="detail-kicker">CONVERSATIONS</p>
                <h2 id="interviews-title">Interview history</h2>
              </div>
              <ClipboardList size={20} aria-hidden="true" />
            </div>
            <p className="application-section-copy">
              Record scheduled and completed conversations, with notes you can
              revisit.
            </p>
            <div className="application-entry-list">
              {draft.interviews.map((item, index) => (
                <div className="application-entry" key={item.id}>
                  <div className="application-entry-heading">
                    <strong>Interview {index + 1}</strong>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Remove interview ${index + 1}`}
                      onClick={() => application.removeInterview(item.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="form-grid">
                    <label className="field">
                      <span>Interview</span>
                      <input
                        value={item.title}
                        onChange={(event) =>
                          application.updateInterview(item.id, {
                            title: event.target.value,
                          })
                        }
                        placeholder="e.g. Technical interview"
                      />
                    </label>
                    <label className="field">
                      <span>Date</span>
                      <input
                        type="date"
                        value={item.date}
                        onChange={(event) =>
                          application.updateInterview(item.id, {
                            date: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Status</span>
                      <select
                        value={item.status}
                        onChange={(event) =>
                          application.updateInterview(item.id, {
                            status: event.target.value as InterviewStatus,
                          })
                        }
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </label>
                    <label className="field application-wide-field">
                      <span>Notes</span>
                      <textarea
                        rows={3}
                        value={item.notes}
                        onChange={(event) =>
                          application.updateInterview(item.id, {
                            notes: event.target.value,
                          })
                        }
                        placeholder="Topics, people, or takeaways…"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {draft.interviews.length === 0 && (
              <p className="application-empty-copy">
                No interviews recorded yet.
              </p>
            )}
            <button
              type="button"
              className="add-button application-add"
              onClick={application.addInterview}
            >
              <Plus size={17} /> Add interview
            </button>
          </section>
          <section
            className="form-panel"
            aria-labelledby="application-notes-title"
          >
            <div className="application-panel-header">
              <div>
                <p className="detail-kicker">PRIVATE WORKSPACE</p>
                <h2 id="application-notes-title">Notes</h2>
              </div>
            </div>
            <label className="field">
              <span>Application notes</span>
              <textarea
                rows={5}
                value={draft.notes}
                onChange={(event) => application.setNotes(event.target.value)}
                placeholder="Add follow-up tasks, contacts, or questions…"
              />
            </label>
            <p className="application-helper">
              {application.changed
                ? 'You have unsaved changes.'
                : 'Everything is saved.'}
            </p>
          </section>
          <section
            className="form-panel application-related"
            aria-labelledby="related-job-title"
          >
            <div className="application-panel-header">
              <div>
                <p className="detail-kicker">SOURCE OPPORTUNITY</p>
                <h2 id="related-job-title">Related job analysis</h2>
              </div>
              <BriefcaseBusiness size={20} aria-hidden="true" />
            </div>
            <p>
              Review the original description, confirmed requirements, and
              profile match for this role.
            </p>
            <Link
              to="/jobs/$jobId"
              params={{ jobId: draft.jobId }}
              className="button button-quiet"
            >
              Open opportunity <ArrowRight size={16} />
            </Link>
          </section>
          {application.notice && (
            <p className="detail-toast" role="status">
              <Check size={17} /> {application.notice}
            </p>
          )}
        </div>
      )}
    </StepLayout>
  )
}

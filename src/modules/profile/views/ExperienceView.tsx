import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { BriefcaseBusiness, Plus, Trash2 } from 'lucide-react'
import { Field, InfoAside, StepLayout } from '../components'
import { ExperiencePeriodField } from '../ExperiencePeriodField'
import { validateExperiencePeriod } from '../datePeriod'
import { useProfile } from '../profileContext'

export function ExperienceView() {
  const { profile, update, save } = useProfile()
  const [busy, setBusy] = useState(false)
  const [validation, setValidation] = useState('')
  const [showDateErrors, setShowDateErrors] = useState(false)
  const navigate = useNavigate()
  if (!profile) return null
  const currentProfile = profile
  const reviewingCv = profile.source === 'cv' && !profile.complete

  async function next() {
    if (!currentProfile.currentRole.trim()) {
      setValidation('Enter your current role to continue.')
      return
    }
    if (
      currentProfile.experience.some((item) =>
        validateExperiencePeriod(item.period),
      )
    ) {
      setShowDateErrors(true)
      setValidation('Check the dates for each experience before continuing.')
      return
    }
    setBusy(true)
    const success = await save({ source: currentProfile.source ?? 'manual' })
    setBusy(false)
    if (success)
      navigate({
        to: currentProfile.complete
          ? '/profile'
          : reviewingCv
            ? '/profile/setup/import-review'
            : '/profile/setup/skills',
      })
  }

  return (
    <StepLayout
      step={2}
      total={6}
      progressLabel={
        profile.complete
          ? 'Edit profile'
          : reviewingCv
            ? 'Review imported profile'
            : undefined
      }
      title="Your professional experience"
      description="Start with your current role, then add positions that show how your work has evolved."
      back={
        profile.complete
          ? '/profile/edit'
          : reviewingCv
            ? '/profile/setup/import-review'
            : '/profile/setup'
      }
      nextLabel={
        profile.complete
          ? 'Save changes'
          : reviewingCv
            ? 'Save and return'
            : 'Continue'
      }
      onNext={next}
      busy={busy}
      aside={
        <InfoAside
          title="A clear picture of your work."
          text="A few focused details are enough to get started."
        />
      }
    >
      <div className="form-stack">
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">1</span>
            <div>
              <h2>Current role</h2>
              <p>
                The position you hold now, or the title that best describes your
                work.
              </p>
            </div>
          </div>
          <Field
            label="Current role"
            value={profile.currentRole}
            onChange={(currentRole) => {
              update({ currentRole })
              setValidation('')
            }}
            placeholder="e.g. Product Designer"
            required
          />
        </section>
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">2</span>
            <div>
              <h2>Previous experience</h2>
              <p>Add the roles most relevant to your next move.</p>
            </div>
          </div>
          {profile.experience.map((item, index) => (
            <div className="repeat-item" key={item.id}>
              <div className="repeat-header">
                <strong>Experience {index + 1}</strong>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Remove experience ${index + 1}`}
                  onClick={() =>
                    update({
                      experience: profile.experience.filter(
                        (entry) => entry.id !== item.id,
                      ),
                    })
                  }
                >
                  <Trash2 size={17} />
                </button>
              </div>
              <div className="form-grid">
                <Field
                  label="Role"
                  value={item.role}
                  onChange={(role) =>
                    update({
                      experience: profile.experience.map((entry) =>
                        entry.id === item.id ? { ...entry, role } : entry,
                      ),
                    })
                  }
                  placeholder="e.g. Senior Product Designer"
                />
                <Field
                  label="Company"
                  value={item.company}
                  onChange={(company) =>
                    update({
                      experience: profile.experience.map((entry) =>
                        entry.id === item.id ? { ...entry, company } : entry,
                      ),
                    })
                  }
                  placeholder="Company name"
                />
                <ExperiencePeriodField
                  index={index}
                  value={item.period}
                  showErrors={showDateErrors}
                  onChange={(period) => {
                    setValidation('')
                    update({
                      experience: profile.experience.map((entry) =>
                        entry.id === item.id ? { ...entry, period } : entry,
                      ),
                    })
                  }}
                />
                <Field
                  label="Summary"
                  value={item.description}
                  onChange={(description) =>
                    update({
                      experience: profile.experience.map((entry) =>
                        entry.id === item.id
                          ? { ...entry, description }
                          : entry,
                      ),
                    })
                  }
                  placeholder="What did you work on?"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="add-button"
            onClick={() =>
              update({
                experience: [
                  ...profile.experience,
                  {
                    id: crypto.randomUUID(),
                    role: '',
                    company: '',
                    period: '',
                    description: '',
                  },
                ],
              })
            }
          >
            <Plus size={17} /> Add experience
          </button>
        </section>
      </div>
      {validation && (
        <p className="inline-error" role="alert">
          {validation}
        </p>
      )}
      <p className="help-text">
        <BriefcaseBusiness size={16} /> You can add more experience from your
        profile later.
      </p>
    </StepLayout>
  )
}

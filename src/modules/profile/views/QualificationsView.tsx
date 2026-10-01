import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Plus, Trash2 } from 'lucide-react'
import { Field, InfoAside, StepLayout } from '../components'
import { useProfile } from '../profileContext'

export function QualificationsView() {
  const { profile, update, save } = useProfile()
  const [busy, setBusy] = useState(false)
  const [yearError, setYearError] = useState('')
  const navigate = useNavigate()
  if (!profile) return null
  const reviewingCv = profile.source === 'cv' && !profile.complete

  async function next() {
    const invalidYear = profile?.education.find(
      (item) => item.year && !isValidEducationYear(item.year),
    )
    if (invalidYear) {
      setYearError(
        `Enter a four digit year between 1900 and ${CURRENT_YEAR + 10}.`,
      )
      document.getElementById(`education-year-${invalidYear.id}`)?.focus()
      return
    }
    setYearError('')
    setBusy(true)
    const success = await save()
    setBusy(false)
    if (success)
      navigate({
        to: profile?.complete
          ? '/profile'
          : reviewingCv
            ? '/profile/setup/import-review'
            : '/profile/preferences',
      })
  }

  return (
    <StepLayout
      step={4}
      total={6}
      progressLabel={
        profile.complete
          ? 'Edit profile'
          : reviewingCv
            ? 'Review imported profile'
            : undefined
      }
      title="Education & credentials"
      description="Round out your profile with education, certifications, and the languages you speak."
      back={
        profile.complete
          ? '/profile/edit'
          : reviewingCv
            ? '/profile/setup/import-review'
            : '/profile/setup/skills'
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
          title="The details that support your work."
          text="Add what matters to your career path. Every section is optional."
        />
      }
    >
      <div className="form-stack">
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">4</span>
            <div>
              <h2>Education</h2>
              <p>Degrees, programmes, and relevant training.</p>
            </div>
          </div>
          {profile.education.map((item, index) => (
            <div className="repeat-item" key={item.id}>
              <div className="repeat-header">
                <strong>Education {index + 1}</strong>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Remove education ${index + 1}`}
                  onClick={() =>
                    update({
                      education: profile.education.filter(
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
                  label="Qualification"
                  value={item.qualification}
                  onChange={(qualification) =>
                    update({
                      education: profile.education.map((entry) =>
                        entry.id === item.id
                          ? { ...entry, qualification }
                          : entry,
                      ),
                    })
                  }
                  placeholder="e.g. BSc Design"
                />
                <Field
                  label="Institution"
                  value={item.institution}
                  onChange={(institution) =>
                    update({
                      education: profile.education.map((entry) =>
                        entry.id === item.id
                          ? { ...entry, institution }
                          : entry,
                      ),
                    })
                  }
                  placeholder="Institution name"
                />
                <label className="field">
                  <span>Year</span>
                  <input
                    id={`education-year-${item.id}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    pattern="[0-9]{4}"
                    aria-invalid={Boolean(
                      yearError &&
                      item.year &&
                      !isValidEducationYear(item.year),
                    )}
                    aria-describedby={
                      yearError ? `education-year-error-${item.id}` : undefined
                    }
                    value={item.year}
                    onChange={(event) => {
                      const year = event.target.value
                        .replace(/\D/g, '')
                        .slice(0, 4)
                      update({
                        education: profile.education.map((entry) =>
                          entry.id === item.id ? { ...entry, year } : entry,
                        ),
                      })
                      if (!year || isValidEducationYear(year)) setYearError('')
                    }}
                    placeholder="e.g. 2020"
                  />
                  {yearError &&
                    item.year &&
                    !isValidEducationYear(item.year) && (
                      <small
                        className="field-error"
                        id={`education-year-error-${item.id}`}
                      >
                        {yearError}
                      </small>
                    )}
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="add-button"
            onClick={() =>
              update({
                education: [
                  ...profile.education,
                  {
                    id: crypto.randomUUID(),
                    qualification: '',
                    institution: '',
                    year: '',
                  },
                ],
              })
            }
          >
            <Plus size={17} /> Add education
          </button>
        </section>
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">5</span>
            <div>
              <h2>Certifications</h2>
              <p>Professional credentials that support your work.</p>
            </div>
          </div>
          {profile.certifications.map((item, index) => (
            <div className="repeat-item" key={item.id}>
              <div className="repeat-header">
                <strong>Certification {index + 1}</strong>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Remove certification ${index + 1}`}
                  onClick={() =>
                    update({
                      certifications: profile.certifications.filter(
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
                  label="Certification"
                  value={item.name}
                  onChange={(name) =>
                    update({
                      certifications: profile.certifications.map((entry) =>
                        entry.id === item.id ? { ...entry, name } : entry,
                      ),
                    })
                  }
                  placeholder="Certification name"
                />
                <Field
                  label="Issuer"
                  value={item.issuer}
                  onChange={(issuer) =>
                    update({
                      certifications: profile.certifications.map((entry) =>
                        entry.id === item.id ? { ...entry, issuer } : entry,
                      ),
                    })
                  }
                  placeholder="Issuing organisation"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="add-button"
            onClick={() =>
              update({
                certifications: [
                  ...profile.certifications,
                  { id: crypto.randomUUID(), name: '', issuer: '' },
                ],
              })
            }
          >
            <Plus size={17} /> Add certification
          </button>
        </section>
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">6</span>
            <div>
              <h2>Languages</h2>
              <p>Languages you can use professionally.</p>
            </div>
          </div>
          {profile.languages.map((item, index) => (
            <div className="repeat-item" key={item.id}>
              <div className="repeat-header">
                <strong>Language {index + 1}</strong>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Remove language ${index + 1}`}
                  onClick={() =>
                    update({
                      languages: profile.languages.filter(
                        (entry) => entry.id !== item.id,
                      ),
                    })
                  }
                >
                  <Trash2 size={17} />
                </button>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Language</span>
                  <input
                    type="text"
                    list={`profile-language-options-${item.id}`}
                    value={item.name}
                    onChange={(event) => {
                      const name = event.target.value
                      update({
                        languages: profile.languages.map((entry) =>
                          entry.id === item.id ? { ...entry, name } : entry,
                        ),
                      })
                    }}
                    placeholder="e.g. Spanish"
                  />
                </label>
                <datalist id={`profile-language-options-${item.id}`}>
                  {LANGUAGE_OPTIONS.map((language) => (
                    <option key={language} value={language} />
                  ))}
                </datalist>
                <label className="field">
                  <span>Proficiency</span>
                  <select
                    value={item.proficiency}
                    onChange={(event) => {
                      const proficiency = event.target.value
                      update({
                        languages: profile.languages.map((entry) =>
                          entry.id === item.id
                            ? { ...entry, proficiency }
                            : entry,
                        ),
                      })
                    }}
                  >
                    <option value="">Select a level</option>
                    {LANGUAGE_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="add-button"
            onClick={() =>
              update({
                languages: [
                  ...profile.languages,
                  { id: crypto.randomUUID(), name: '', proficiency: '' },
                ],
              })
            }
          >
            <Plus size={17} /> Add language
          </button>
        </section>
      </div>
    </StepLayout>
  )
}

const CURRENT_YEAR = new Date().getFullYear()
const LANGUAGE_OPTIONS = [
  'Arabic',
  'Bengali',
  'Chinese',
  'Dutch',
  'English',
  'French',
  'German',
  'Hindi',
  'Italian',
  'Japanese',
  'Korean',
  'Polish',
  'Portuguese',
  'Russian',
  'Spanish',
  'Swahili',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Vietnamese',
]
const LANGUAGE_LEVELS = [
  'Basic',
  'Conversational',
  'Professional',
  'Fluent',
  'Native',
]

function isValidEducationYear(value: string) {
  if (!/^\d{4}$/.test(value)) return false
  const year = Number(value)
  return year >= 1900 && year <= CURRENT_YEAR + 10
}

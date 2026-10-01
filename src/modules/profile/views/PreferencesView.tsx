import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Plus, X } from 'lucide-react'
import { Field, InfoAside, StepLayout } from '../components'
import { useProfile } from '../profileContext'

function Tags({
  title,
  items,
  onChange,
  placeholder,
}: {
  title: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
}) {
  const [draft, setDraft] = useState('')
  function add() {
    const value = draft.trim()
    if (
      !value ||
      items.some((item) => item.toLowerCase() === value.toLowerCase())
    )
      return
    onChange([...items, value])
    setDraft('')
  }
  return (
    <div className="tag-input">
      <span className="field-label">{title}</span>
      <div className="chip-list">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className="chip chip-removable"
            aria-label={`Remove ${item}`}
            onClick={() => onChange(items.filter((entry) => entry !== item))}
          >
            {item}
            <X size={14} />
          </button>
        ))}
      </div>
      <div className="tag-add">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              add()
            }
          }}
          placeholder={placeholder}
          aria-label={`Add ${title.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={add}
          aria-label={`Add ${title.toLowerCase()}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}

export function PreferencesView() {
  const { profile, update, save } = useProfile()
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  if (!profile) return null
  const cvPath = profile.source === 'cv'

  async function next() {
    setBusy(true)
    const success = await save()
    setBusy(false)
    if (success)
      navigate({ to: profile?.complete ? '/profile' : '/profile/setup/review' })
  }

  return (
    <StepLayout
      step={cvPath ? 4 : 5}
      total={cvPath ? 5 : 6}
      progressLabel={profile.complete ? 'Edit profile' : undefined}
      title="What are you looking for next?"
      description="These preferences help us identify opportunities that fit your goals."
      back={
        profile.complete
          ? '/profile/edit'
          : cvPath
            ? '/profile/setup/import-review'
            : '/profile/setup/qualifications'
      }
      nextLabel={profile.complete ? 'Save changes' : 'Review profile'}
      onNext={next}
      busy={busy}
      aside={
        <InfoAside
          title="Your goals make it personal."
          text="Your experience is a starting point. These details shape what comes next."
          variant="orbit"
        />
      }
    >
      <div className="form-stack">
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">1</span>
            <div>
              <h2>Career interests</h2>
              <p>Select the areas you’re most interested in.</p>
            </div>
          </div>
          <Tags
            title="Areas of interest"
            items={profile.interests}
            onChange={(interests) => update({ interests })}
            placeholder="e.g. AI products"
          />
        </section>
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">2</span>
            <div>
              <h2>Work & location</h2>
              <p>
                Tell us how you prefer to work and where you’d like to be based.
              </p>
            </div>
          </div>
          <div className="field-label">Work model</div>
          <div
            className="segmented"
            role="group"
            aria-label="Preferred work models"
          >
            {['Remote', 'Hybrid', 'On-site'].map((model) => (
              <button
                type="button"
                key={model}
                aria-pressed={profile.workModels.includes(model)}
                className={profile.workModels.includes(model) ? 'selected' : ''}
                onClick={() =>
                  update({
                    workModels: profile.workModels.includes(model)
                      ? profile.workModels.filter((item) => item !== model)
                      : [...profile.workModels, model],
                  })
                }
              >
                {model}
              </button>
            ))}
          </div>
          <Tags
            title="Preferred locations"
            items={profile.locations}
            onChange={(locations) => update({ locations })}
            placeholder="e.g. Madrid"
          />
        </section>
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">3</span>
            <div>
              <h2>Salary expectations</h2>
              <p>Help us match you with relevant opportunities.</p>
            </div>
          </div>
          <div className="salary-grid">
            <label className="field">
              <span>Currency</span>
              <select
                value={profile.salaryCurrency}
                onChange={(event) =>
                  update({ salaryCurrency: event.target.value })
                }
              >
                <option value="EUR">EUR €</option>
                <option value="USD">USD $</option>
                <option value="GBP">GBP £</option>
              </select>
            </label>
            <Field
              label="Minimum annual salary"
              type="number"
              value={profile.salaryMinimum}
              onChange={(salaryMinimum) => update({ salaryMinimum })}
              placeholder="55,000"
            />
            <Field
              label="Target annual salary"
              type="number"
              value={profile.salaryTarget}
              onChange={(salaryTarget) => update({ salaryTarget })}
              placeholder="70,000"
            />
          </div>
        </section>
      </div>
      <p className="help-text">You can change these preferences later.</p>
    </StepLayout>
  )
}

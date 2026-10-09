import { Plus, Trash2 } from 'lucide-react'
import type {
  JobRequirement,
  RequirementCategory,
  RequirementPriority,
} from '../types'

const sections: {
  category: RequirementCategory
  title: string
  description: string
}[] = [
  {
    category: 'skill',
    title: 'Skills',
    description: 'Technical and professional capabilities.',
  },
  {
    category: 'language',
    title: 'Languages',
    description: 'Languages requested for the role.',
  },
  {
    category: 'education',
    title: 'Education',
    description: 'Degrees or education requested for the role.',
  },
  {
    category: 'certification',
    title: 'Certifications',
    description: 'Credentials or certificates mentioned.',
  },
  {
    category: 'location',
    title: 'Location constraints',
    description: 'Geographic and relocation requirements.',
  },
  {
    category: 'work',
    title: 'Work arrangement',
    description: 'Remote, hybrid, or on-site expectations.',
  },
]

export function RequirementsEditor({
  requirements,
  onChange,
  onAdd,
  onRemove,
}: {
  requirements: JobRequirement[]
  onChange: (id: string, changes: Partial<JobRequirement>) => void
  onAdd: (category: RequirementCategory) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="job-requirement-sections">
      {sections.map((section) => {
        const items = requirements.filter(
          (item) => item.category === section.category,
        )
        return (
          <section className="job-requirement-section" key={section.category}>
            <header className="job-section-heading">
              <div>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              <button
                type="button"
                className="add-button"
                onClick={() => onAdd(section.category)}
              >
                <Plus size={16} /> Add
              </button>
            </header>
            {items.length === 0 ? (
              <p className="job-empty-requirements">
                No {section.title.toLowerCase()} found. Add any that apply.
              </p>
            ) : (
              <div className="job-requirement-list">
                {items.map((item, index) => (
                  <div className="job-requirement-row" key={item.id}>
                    <label
                      className="sr-only"
                      htmlFor={`requirement-${item.id}`}
                    >
                      {section.title} requirement {index + 1}
                    </label>
                    <input
                      id={`requirement-${item.id}`}
                      value={item.text}
                      onChange={(event) =>
                        onChange(item.id, { text: event.target.value })
                      }
                      placeholder={`Add a ${section.title.toLowerCase()} requirement`}
                    />
                    <label className="sr-only" htmlFor={`priority-${item.id}`}>
                      Classification for{' '}
                      {item.text || `${section.title} requirement ${index + 1}`}
                    </label>
                    <select
                      id={`priority-${item.id}`}
                      value={item.priority}
                      onChange={(event) =>
                        onChange(item.id, {
                          priority: event.target.value as RequirementPriority,
                        })
                      }
                    >
                      <option value="required">Required</option>
                      <option value="preferred">Preferred</option>
                    </select>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Remove ${section.title.toLowerCase()} requirement ${index + 1}`}
                      onClick={() => onRemove(item.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

import './styles.css'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Layers3 } from 'lucide-react'

const links = [
  {
    label: 'Dashboard',
    path: '/',
    note: 'Home and job search summary',
  },
  {
    label: 'Applications',
    path: '/applications',
    note: 'Track stages, interviews, dates, and notes',
  },
  {
    label: 'Job opportunities',
    path: '/jobs',
    note: 'Capture and review target roles',
  },
  { label: 'Profile preview', path: '/profile', note: 'The main profile page' },
  {
    label: 'Start onboarding',
    path: '/profile/setup',
    note: 'Choose CV import or manual entry',
  },
  { label: 'CV upload', path: '/profile/setup/upload', note: 'Import route' },
  {
    label: 'CV review',
    path: '/profile/setup/import-review',
    note: 'Review imported details',
  },
  {
    label: 'Manual experience',
    path: '/profile/setup/experience',
    note: 'First manual step',
  },
  {
    label: 'Skills',
    path: '/profile/setup/skills',
    note: 'Skills and proficiency',
  },
  {
    label: 'Education',
    path: '/profile/setup/qualifications',
    note: 'Credentials and languages',
  },
  {
    label: 'Preferences',
    path: '/profile/preferences',
    note: 'Goals, work model, and salary',
  },
  {
    label: 'Final review',
    path: '/profile/setup/review',
    note: 'Confirm profile before finishing',
  },
  {
    label: 'Edit profile',
    path: '/profile/edit',
    note: 'Choose a section to update',
  },
]

export function RootPage() {
  return (
    <main className="root-page">
      <div className="root-intro">
        <span className="root-icon">
          <Layers3 size={27} />
        </span>
        <p className="eyebrow">CAREER INTEL · MODULES</p>
        <h1>Explore Career Intel</h1>
        <p className="lead">
          Explore your profile, saved opportunities, and applications as the
          product grows module by module.
        </p>
      </div>
      <div className="root-links">
        {links.map((item) => (
          <Link to={item.path} key={item.path} className="root-link">
            <span>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </span>
            <ArrowRight size={19} />
          </Link>
        ))}
      </div>
    </main>
  )
}

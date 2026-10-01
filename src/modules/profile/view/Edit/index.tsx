import './styles.css'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Wrench,
} from 'lucide-react'

const sections = [
  {
    title: 'Role & experience',
    description: 'Current role and previous positions',
    to: '/profile/setup/experience',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Skills & proficiency',
    description: 'Skills and confidence levels',
    to: '/profile/setup/skills',
    icon: Wrench,
  },
  {
    title: 'Education & credentials',
    description: 'Education, certifications, and languages',
    to: '/profile/setup/qualifications',
    icon: GraduationCap,
  },
  {
    title: 'Career preferences',
    description: 'Interests, work, location, and salary',
    to: '/profile/preferences',
    icon: MapPin,
  },
]

export function EditView() {
  return (
    <main className="profile-page edit-page">
      <Link to="/profile" className="back-link">
        <ArrowLeft size={17} /> Back to profile
      </Link>
      <p className="eyebrow">PROFILE</p>
      <h1>Edit your profile</h1>
      <p className="lead">
        Choose a section to update. Your profile remains editable as your career
        changes.
      </p>
      <div className="edit-grid">
        {sections.map(({ title, description, to, icon: Icon }) => (
          <Link to={to} className="edit-card" key={title}>
            <span className="row-icon">
              <Icon size={22} />
            </span>
            <span>
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <ArrowRight size={19} />
          </Link>
        ))}
      </div>
    </main>
  )
}

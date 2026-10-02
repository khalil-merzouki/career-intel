import './styles.css'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Pencil, Sparkles } from 'lucide-react'
import { ProfileCharacter } from '../../components/components'
import { useProfile } from '../../hooks/profileContext'
import { ProfileSummary } from '../../components/ProfileSummary'

export function ProfilePage() {
  const { profile } = useProfile()
  if (!profile) return null
  if (!profile.complete)
    return (
      <main className="profile-empty">
        <div>
          <Link to="/" className="back-link">
            <ArrowLeft size={17} /> Back to dashboard
          </Link>
          <p className="eyebrow">YOUR PROFILE</p>
          <h1>Your next chapter starts here.</h1>
          <p className="lead">
            Build a profile that brings your experience, strengths, and career
            goals together.
          </p>
          <Link to="/profile/setup" className="button button-primary">
            Set up profile <ArrowRight size={18} />
          </Link>
        </div>
        <ProfileCharacter variant="orbit" />
      </main>
    )

  return (
    <main className="profile-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={17} /> Back to dashboard
      </Link>
      <div className="profile-page-head">
        <div>
          <p className="eyebrow">YOUR PROFILE</p>
          <h1>Your career profile</h1>
          <p className="lead">
            A clear view of your experience and what you’re looking for next.
          </p>
        </div>
        <Link to="/profile/edit" className="button button-quiet">
          <Pencil size={17} /> Edit profile
        </Link>
      </div>
      <div className="profile-banner">
        <span className="banner-icon">
          <Sparkles size={22} />
        </span>
        <div>
          <strong>{profile.currentRole || 'Your profile'}</strong>
          <p>
            Keep your details current to make future opportunities more
            relevant.
          </p>
        </div>
        <span className="pill">Profile ready</span>
      </div>
      <ProfileSummary profile={profile} editable />
    </main>
  )
}

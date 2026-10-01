import './styles.css'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { InfoAside, StepLayout } from '../../components/components'
import { ProfileSummary } from '../../components/ProfileSummary'
import { useProfile } from '../../hooks/profileContext'

export function FinalReviewView() {
  const { profile, save } = useProfile()
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  if (!profile) return null

  async function finish() {
    setBusy(true)
    const success = await save({ complete: true })
    setBusy(false)
    if (success) navigate({ to: '/profile' })
  }

  return (
    <StepLayout
      step={profile.source === 'cv' ? 5 : 6}
      total={profile.source === 'cv' ? 5 : 6}
      title="Your profile, ready to use"
      description="Take a final look. You can edit every section later from your profile."
      back="/profile/preferences"
      nextLabel="Finish setup"
      onNext={finish}
      busy={busy}
      aside={
        <InfoAside
          title="A profile that grows with you."
          text="Update it whenever your experience or direction changes."
          variant="orbit"
        />
      }
    >
      <ProfileSummary profile={profile} editable />
    </StepLayout>
  )
}

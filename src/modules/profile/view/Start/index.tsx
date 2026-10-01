import './styles.css'
import { FileUp, PencilLine, ShieldCheck } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { StepLayout, ProfileCharacter } from '../../components/components'
import { useProfile } from '../../hooks/profileContext'
import { useNavigate } from '@tanstack/react-router'

export function StartView() {
  const { reset } = useProfile()
  const navigate = useNavigate()

  async function startManual() {
    if (await reset()) navigate({ to: '/profile/setup/experience' })
  }
  return (
    <StepLayout
      step={1}
      total={5}
      showProgress={false}
      title="Let’s build your career profile"
      description="Start with your CV or add your details manually. You can review everything before saving."
      aside={<ProfileCharacter />}
    >
      <div className="choice-grid">
        <Link
          to="/profile/setup/upload"
          className="choice-card choice-featured"
        >
          <span className="pill recommendation">✦ Recommended</span>
          <span className="choice-icon">
            <FileUp size={33} strokeWidth={1.7} />
          </span>
          <h2>Import from CV</h2>
          <p>
            Upload a PDF or DOCX to prefill your experience, skills, and
            education.
          </p>
          <span className="button button-primary">
            Choose a file <FileUp size={17} />
          </span>
        </Link>
        <button type="button" onClick={startManual} className="choice-card">
          <span className="pill placeholder-pill" aria-hidden="true">
            &nbsp;
          </span>
          <span className="choice-icon">
            <PencilLine size={33} strokeWidth={1.7} />
          </span>
          <h2>Enter manually</h2>
          <p>Build your profile one step at a time.</p>
          <span className="button button-quiet">
            Start manually <span aria-hidden="true">→</span>
          </span>
        </button>
      </div>
      <p className="trust-note">
        <ShieldCheck size={17} /> Your information stays editable throughout
        setup.
      </p>
    </StepLayout>
  )
}

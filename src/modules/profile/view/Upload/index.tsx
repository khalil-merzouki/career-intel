import './styles.css'
import { useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { FileText, UploadCloud } from 'lucide-react'
import { HelpText, InfoAside, StepLayout } from '../../components/components'
import { useProfile } from '../../hooks/profileContext'

export function UploadView() {
  const input = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [validation, setValidation] = useState('')
  const { importCv } = useProfile()
  const navigate = useNavigate()

  async function continueImport() {
    if (!file) {
      setValidation('Choose a PDF or DOCX file to continue.')
      return
    }
    setBusy(true)
    const success = await importCv(file)
    setBusy(false)
    if (success) navigate({ to: '/profile/setup/import-review' })
  }

  function choose(candidate?: File) {
    if (!candidate) return
    const validType = /\.(pdf|docx)$/i.test(candidate.name)
    if (!validType) {
      setValidation('Use a PDF or DOCX file.')
      return
    }
    if (candidate.size > 10 * 1024 * 1024) {
      setValidation('Choose a file smaller than 10 MB.')
      return
    }
    setValidation('')
    setFile(candidate)
  }

  return (
    <StepLayout
      step={2}
      total={5}
      title="Import your CV"
      description="We’ll prepare a draft from your document. You’ll review every detail before it becomes part of your profile."
      back="/profile/setup"
      nextLabel="Import and review"
      onNext={continueImport}
      busy={busy}
      aside={
        <InfoAside
          title="Your experience, at a glance."
          text="You stay in control of the information in your profile."
        />
      }
    >
      <input
        ref={input}
        className="sr-only"
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(event) => choose(event.target.files?.[0])}
        aria-label="Choose CV document"
      />
      <div
        className="upload-drop"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          choose(event.dataTransfer.files[0])
        }}
      >
        <span className="upload-icon">
          {file ? <FileText size={32} /> : <UploadCloud size={34} />}
        </span>
        <h2>{file ? file.name : 'Drop your CV here'}</h2>
        <p>{file ? 'Ready to import' : 'PDF or DOCX, up to 10 MB'}</p>
        <button
          type="button"
          className="button button-quiet"
          onClick={() => input.current?.click()}
        >
          {file ? 'Choose a different file' : 'Browse files'}
        </button>
      </div>
      {validation && (
        <p className="inline-error" role="alert">
          {validation}
        </p>
      )}
      <HelpText>
        The import is a mock for this UI prototype. It returns sample extracted
        details for review.
      </HelpText>
    </StepLayout>
  )
}

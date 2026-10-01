import { CircleHelp } from 'lucide-react'
import type { ReactNode } from 'react'

export function ProfileCharacter({
  variant = 'document',
}: {
  variant?: 'document' | 'orbit'
}) {
  return (
    <svg
      className="profile-character"
      viewBox="0 0 270 240"
      role="img"
      aria-label="A friendly geometric character"
    >
      <circle cx="127" cy="119" r="98" fill="var(--palette-f1f0ef)" />
      <circle cx="207" cy="38" r="7" fill="var(--palette-6f9634)" />
      <circle cx="237" cy="88" r="4" fill="var(--palette-1d7656)" />
      <path
        d="M40 67c55-63 159-56 191 19"
        fill="none"
        stroke="var(--palette-a7c2ad)"
        strokeDasharray="4 7"
      />
      <path
        d="M83 189L124 52c4-13 22-13 26 0l42 137c3 11-5 20-16 20H99c-11 0-19-9-16-20Z"
        fill="var(--palette-1d7656)"
      />
      <circle cx="124" cy="143" r="4" fill="white" />
      <circle cx="150" cy="143" r="4" fill="white" />
      <path
        d="M128 160q9 9 18 0"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M99 207l-11 23M172 207l13 23M89 163l-24-14M185 163l21-17"
        stroke="var(--palette-153c2c)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {variant === 'document' ? (
        <g transform="rotate(12 210 116)">
          <rect
            x="188"
            y="80"
            width="52"
            height="69"
            rx="5"
            fill="white"
            stroke="var(--palette-aac7b5)"
            strokeWidth="3"
          />
          <path
            d="M198 101h31M198 112h31M198 123h23"
            stroke="var(--palette-aac7b5)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <>
          <circle cx="219" cy="113" r="17" fill="var(--palette-6f9634)" />
          <circle cx="219" cy="113" r="7" fill="var(--palette-1d7656)" />
        </>
      )}
    </svg>
  )
}

export function InfoAside({
  title,
  text,
  variant,
}: {
  title: string
  text: string
  variant?: 'document' | 'orbit'
}) {
  return (
    <div className="info-aside">
      <ProfileCharacter variant={variant} />
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="accent-line" />
    </div>
  )
}

export function HelpText({ children }: { children: ReactNode }) {
  return (
    <p className="help-text">
      <CircleHelp size={16} />
      {children}
    </p>
  )
}

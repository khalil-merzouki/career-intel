import {
  StepLayout as SharedStepLayout,
  type StepLayoutProps,
} from '../../../shared/components'
import { useProfile } from '../hooks/profileContext'

export function StepLayout(
  props: Omit<StepLayoutProps, 'error' | 'eyebrow'> & { eyebrow?: string },
) {
  const { error } = useProfile()
  return (
    <SharedStepLayout
      {...props}
      eyebrow={props.eyebrow ?? 'PROFILE SETUP'}
      error={error ?? undefined}
    />
  )
}

export {
  Field,
  HelpText,
  InfoAside,
  ProfileCharacter,
  ReviewRow,
  SummaryCheck,
} from '../../../shared/components'

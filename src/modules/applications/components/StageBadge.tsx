import { stageLabel } from '../stages'
import type { ApplicationStage } from '../types'

export interface StageBadgeProps {
  stage: ApplicationStage
}
export function StageBadge({ stage }: StageBadgeProps) {
  return (
    <span className={`application-stage stage-${stage}`}>
      {stageLabel(stage)}
    </span>
  )
}

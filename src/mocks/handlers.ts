import {
  profileHandlers,
  getMockProfile,
} from '../modules/profile/api/handlers'
import {
  jobHandlers,
  createJobMatchHandlers,
  getApplicationSource,
  getMockOpportunities,
  markOpportunityApplied,
} from '../modules/job-opportunities/api/handlers'
import { compareOpportunity } from '../modules/job-opportunities/api/matchAnalysis'
import {
  createApplicationHandlers,
  getMockApplications,
} from '../modules/applications/api/handlers'
import { isActiveStage, stageLabel } from '../modules/applications/stages'
import { createDashboardHandlers } from '../modules/dashboard/api/handlers'

export const handlers = [
  ...profileHandlers,
  ...jobHandlers,
  ...createJobMatchHandlers(getMockProfile),
  ...createApplicationHandlers(getApplicationSource, markOpportunityApplied),
  ...createDashboardHandlers(
    () => getMockProfile().complete,
    getMockOpportunities,
    getMockApplications,
    isActiveStage,
    stageLabel,
    (jobId) => {
      const job = getMockOpportunities().find((item) => item.id === jobId)
      return job ? compareOpportunity(job, getMockProfile()) : null
    },
  ),
]

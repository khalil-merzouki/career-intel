import {
  profileHandlers,
  getMockProfile,
} from '../modules/profile/api/handlers'
import {
  jobHandlers,
  createJobMatchHandlers,
  getApplicationSource,
  markOpportunityApplied,
} from '../modules/job-opportunities/api/handlers'
import { createApplicationHandlers } from '../modules/applications/api/handlers'

export const handlers = [
  ...profileHandlers,
  ...jobHandlers,
  ...createJobMatchHandlers(getMockProfile),
  ...createApplicationHandlers(getApplicationSource, markOpportunityApplied),
]

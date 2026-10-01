import {
  profileHandlers,
  getMockProfile,
} from '../modules/profile/api/handlers'
import {
  jobHandlers,
  createJobMatchHandlers,
} from '../modules/job-opportunities/api/handlers'

export const handlers = [
  ...profileHandlers,
  ...jobHandlers,
  ...createJobMatchHandlers(getMockProfile),
]

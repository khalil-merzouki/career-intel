import { profileHandlers } from '../modules/profile/api/handlers'
import { jobHandlers } from '../modules/job-opportunities/api/handlers'

export const handlers = [...profileHandlers, ...jobHandlers]

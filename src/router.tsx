import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { RootPage } from './modules/profile/view/ModuleIndex'
import { ProfileProvider } from './modules/profile/hooks/ProfileProvider'
import { ProfilePage } from './modules/profile/view/Profile'
import { StartView } from './modules/profile/view/Start'
import { UploadView } from './modules/profile/view/Upload'
import { ImportReviewView } from './modules/profile/view/ImportReview'
import { ExperienceView } from './modules/profile/view/Experience'
import { SkillsView } from './modules/profile/view/Skills'
import { QualificationsView } from './modules/profile/view/Qualifications'
import { PreferencesView } from './modules/profile/view/Preferences'
import { FinalReviewView } from './modules/profile/view/FinalReview'
import { EditView } from './modules/profile/view/Edit'
import { JobOpportunitiesView } from './modules/job-opportunities/view/Index'
import { JobCaptureView } from './modules/job-opportunities/view/Capture'
import { JobReviewView } from './modules/job-opportunities/view/Review'
import { JobDetailView } from './modules/job-opportunities/view/Detail'

const rootRoute = createRootRoute({
  component: () => (
    <ProfileProvider>
      <Outlet />
    </ProfileProvider>
  ),
})

const routes = [
  ['/', RootPage],
  ['/profile', ProfilePage],
  ['/profile/setup', StartView],
  ['/profile/setup/upload', UploadView],
  ['/profile/setup/import-review', ImportReviewView],
  ['/profile/setup/experience', ExperienceView],
  ['/profile/setup/skills', SkillsView],
  ['/profile/setup/qualifications', QualificationsView],
  ['/profile/preferences', PreferencesView],
  ['/profile/setup/review', FinalReviewView],
  ['/profile/edit', EditView],
  ['/jobs', JobOpportunitiesView],
  ['/jobs/new', JobCaptureView],
  ['/jobs/$jobId', JobDetailView],
  ['/jobs/$jobId/review', JobReviewView],
] as const

const routeTree = rootRoute.addChildren(
  routes.map(([path, component]) =>
    createRoute({ getParentRoute: () => rootRoute, path, component }),
  ),
)

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

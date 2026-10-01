import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import { RootPage } from './RootPage'
import { ProfileProvider } from './modules/profile/ProfileProvider'
import { ProfilePage } from './modules/profile'
import { StartView } from './modules/profile/views/StartView'
import { UploadView } from './modules/profile/views/UploadView'
import { ImportReviewView } from './modules/profile/views/ImportReviewView'
import { ExperienceView } from './modules/profile/views/ExperienceView'
import { SkillsView } from './modules/profile/views/SkillsView'
import { QualificationsView } from './modules/profile/views/QualificationsView'
import { PreferencesView } from './modules/profile/views/PreferencesView'
import { FinalReviewView } from './modules/profile/views/FinalReviewView'
import { EditView } from './modules/profile/views/EditView'

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
] as const

const routeTree = rootRoute.addChildren(
  routes.map(([path, component]) =>
    createRoute({ getParentRoute: () => rootRoute, path, component }),
  ),
)

export const router = createRouter({ routeTree, defaultPreload: 'intent' })

import { createContext, useContext } from 'react'
import type { Profile } from './types'

export interface ProfileContextValue {
  profile: Profile | null
  loading: boolean
  error: string | null
  update: (changes: Partial<Profile>) => void
  save: (changes?: Partial<Profile>) => Promise<boolean>
  importCv: (file: File) => Promise<boolean>
  reset: () => Promise<boolean>
}

export const ProfileContext = createContext<ProfileContextValue | null>(null)

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('Profile views must be inside ProfileProvider')
  return context
}

import { useEffect, useState, type ReactNode } from 'react'
import { profileApi } from './api'
import type { Profile } from './types'
import { ProfileContext } from './profileContext'

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    profileApi
      .get()
      .then(setProfile)
      .catch((issue: Error) => setError(issue.message))
      .finally(() => setLoading(false))
  }, [])

  function update(changes: Partial<Profile>) {
    setProfile((current) => (current ? { ...current, ...changes } : current))
    setError(null)
  }

  async function save(changes: Partial<Profile> = {}) {
    if (!profile) return false
    try {
      const result = await profileApi.save({ ...profile, ...changes })
      setProfile(result)
      setError(null)
      return true
    } catch (issue) {
      setError((issue as Error).message)
      return false
    }
  }

  async function importCv(file: File) {
    try {
      const result = await profileApi.importCv(file)
      setProfile(result)
      setError(null)
      return true
    } catch (issue) {
      setError((issue as Error).message)
      return false
    }
  }

  async function reset() {
    try {
      const result = await profileApi.reset()
      setProfile(result)
      setError(null)
      return true
    } catch (issue) {
      setError((issue as Error).message)
      return false
    }
  }

  return (
    <ProfileContext.Provider
      value={{ profile, loading, error, update, save, importCv, reset }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

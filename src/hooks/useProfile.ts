import { useLocalStorage } from './useLocalStorage'
import type { Profile } from '../types'

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<Profile | null>('kami_profile', null)
  return { profile, setProfile }
}

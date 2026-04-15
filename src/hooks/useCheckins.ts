import { useLocalStorage } from './useLocalStorage'
import type { Checkin } from '../types'
import { STATIC_CHECKINS } from '../constants'

const ONE_HOUR = 1000 * 60 * 60

export function useCheckins() {
  const [userCheckins, setUserCheckins] = useLocalStorage<Checkin[]>('kami_checkins', [])

  const allCheckins = [...STATIC_CHECKINS, ...userCheckins]

  const getActiveCheckins = (spotId: string) =>
    allCheckins.filter((c) => c.spotId === spotId && c.expiresAt > Date.now())

  const getMyActiveCheckin = (userId: string) =>
    userCheckins.find((c) => c.userId === userId && c.expiresAt > Date.now()) ?? null

  const getTotalActiveForSpot = (spotId: string) =>
    getActiveCheckins(spotId).length

  const checkin = (input: Omit<Checkin, 'id' | 'expiresAt'>) => {
    const newCheckin: Checkin = {
      ...input,
      id: `c_${Date.now()}`,
      expiresAt: Date.now() + ONE_HOUR,
    }
    setUserCheckins((prev) => [
      ...prev.filter((c) => c.userId !== input.userId),
      newCheckin,
    ])
    return newCheckin
  }

  const checkout = (userId: string) => {
    setUserCheckins((prev) => prev.filter((c) => c.userId !== userId))
  }

  return { allCheckins, getActiveCheckins, getMyActiveCheckin, getTotalActiveForSpot, checkin, checkout }
}

import { useLocalStorage } from './useLocalStorage'

export function usePoints() {
  const [points, setPoints] = useLocalStorage<number>('kami_points', 0)
  const [greeted, setGreeted] = useLocalStorage<string[]>('kami_greeted', [])

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount)
  }

  const greet = (userId: string): boolean => {
    if (greeted.includes(userId)) return false
    setGreeted((prev) => [...prev, userId])
    addPoints(10)
    return true
  }

  const hasGreeted = (userId: string) => greeted.includes(userId)

  return { points, addPoints, greet, hasGreeted }
}

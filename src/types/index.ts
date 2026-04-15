export interface Profile {
  id: string
  nickname: string
  tags: string[]
  attribute: '移住者' | '学生' | '地元民' | '来訪者'
}

export interface Spot {
  id: string
  name: string
  description: string
  emoji: string
}

export interface DummyUser {
  id: string
  nickname: string
  tags: string[]
  attribute: string
  emoji: string
}

export interface Checkin {
  id: string
  userId: string
  spotId: string
  status: string
  message: string
  expiresAt: number
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  tags: string[]
  emoji: string
}

export interface RouteStop {
  name: string
  description: string
  duration: string
  emoji: string
}

export interface TourRoute {
  id: string
  name: string
  description: string
  totalDuration: string
  stops: RouteStop[]
}

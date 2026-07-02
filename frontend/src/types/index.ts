export interface ShortenResult {
  slug: string
  shorturl: string
  originalUrl: string
}

export interface ClicksPerDay {
  _id: string
  total: number
}

export interface MostSearched {
  _id: string
  total: number
}

export interface UrlStats {
  totalClicks: number
  clicksPerDay: ClicksPerDay[]
  mostSearched: MostSearched[]
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
}

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

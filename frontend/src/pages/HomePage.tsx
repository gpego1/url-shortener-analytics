import { api } from "../api/client.js"
import { getApiErrorMessage } from "../lib/errorHandler.js"
import { useState } from "react"
import Hero from "../components/home/Hero.js"
import UrlForm from "../components/UrlForm.js"
import UrlResult from "../components/home/UrlResult.js"
import ErrorMessage from "../components/ui/ErrorMessage.js"
import type { ShortenResult } from "../types/index.js"

const SESSION_KEY = "home:lastResult"

function HomePage() {
  const [result, setResult] = useState<ShortenResult | null>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY)
      return saved ? (JSON.parse(saved) as ShortenResult) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleShorten = async (_originalUrl: string) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.post("/api/urls", {
        originalUrl: _originalUrl,
      })

      setResult(response.data)
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(response.data))

    } catch (err) {
      const { message } = getApiErrorMessage(err)
      setError(message)
    } finally {
      setLoading(false)
    }
    
  }

  return (
    <div className="home-page">
      <Hero />
      <UrlForm onSubmit={handleShorten} loading={loading} />
      {error && <ErrorMessage message={error} />}
      {result && <UrlResult result={result} />}
    </div>
  )
}

export default HomePage

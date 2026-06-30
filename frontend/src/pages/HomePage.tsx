import { useState } from "react"
import Hero from "../components/home/Hero.js"
import UrlForm from "../components/UrlForm.js"
import UrlResult from "../components/home/UrlResult.js"
import ErrorMessage from "../components/ui/ErrorMessage.js"
import type { ShortenResult } from "../types/index.js"

function HomePage() {
  const [result, setResult] = useState<ShortenResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleShorten = (_originalUrl: string) => {
    setLoading(true)
    setError(null)
    setResult(null)
    // ponto de integração: chamar POST /api/urls e então setResult(...) ou setError(...)
    setLoading(false)
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

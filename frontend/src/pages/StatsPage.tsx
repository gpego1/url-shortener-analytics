import { api } from "../api/client.js"
import { getApiErrorMessage } from "../lib/errorHandler.js"
import { useState } from "react"
import { useParams } from "react-router-dom"
import StatsLookupForm from "../components/stats/StatsLookupForm.js"
import StatsSummary from "../components/stats/StatsSummary.js"
import ClicksChart from "../components/stats/ClicksChart.js"
import ErrorMessage from "../components/ui/ErrorMessage.js"
import EmptyState from "../components/ui/EmptyState.js"
import type { UrlStats } from "../types/index.js"

function StatsPage() {
  const { slug } = useParams<{ slug?: string }>()
  const [stats, setStats] = useState<UrlStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

  const handleSearch = async (_slug: string) => {
    setLoading(true)
    setError(null)
    setStats(null)
    
    try {
      const response = await api.get<UrlStats | null>(`/api/stats/${_slug}`)
      setStats(response.data)
    } catch (err) {
      const { message } = getApiErrorMessage(err)
      setError(message)
    } finally {
      setLoading(false)
    }
   
  }

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1>Estatísticas do link</h1>
        <p>Acompanhe cliques e origem de acesso do seu link encurtado.</p>
      </div>

      <StatsLookupForm initialSlug={slug} onSubmit={handleSearch} loading={loading} />

      {error && <ErrorMessage message={error} />}

      {!error && !stats && !loading && (
        <EmptyState
          title="Nenhum dado para exibir"
          description="Busque pelo código de um link para ver as estatísticas."
        />
      )}

      {stats && (
        <>
          <StatsSummary stats={stats} />
          <ClicksChart data={stats.clicksPerDay} />
        </>
      )}
    </div>
  )
}

export default StatsPage

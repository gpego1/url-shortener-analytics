import type { UrlStats } from "../../types/index.js"

interface StatsSummaryProps {
  stats: UrlStats
}

function StatsSummary({ stats }: StatsSummaryProps) {
  const topReferrer = stats.mostSearched[0]

  return (
    <div className="stats-grid">
      <div className="stats-card">
        <span className="stats-card__label">Total de cliques</span>
        <span className="stats-card__value">{stats.totalClicks}</span>
      </div>
      <div className="stats-card">
        <span className="stats-card__label">Dias com atividade</span>
        <span className="stats-card__value">{stats.clicksPerDay.length}</span>
      </div>
      <div className="stats-card stats-card--wide">
        <span className="stats-card__label">Origem mais frequente</span>
        <span className="stats-card__value stats-card__value--mono">
          {topReferrer ? topReferrer._id : "—"}
        </span>
      </div>
    </div>
  )
}

export default StatsSummary

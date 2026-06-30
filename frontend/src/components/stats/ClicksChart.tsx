import type { ClicksPerDay } from "../../types/index.js"

interface ClicksChartProps {
  data: ClicksPerDay[]
}

const formatLabel = (isoDate: string) => {
  const [, month, day] = isoDate.split("-")
  return `${day}/${month}`
}

function ClicksChart({ data }: ClicksChartProps) {
  const maxTotal = Math.max(...data.map((day) => day.total), 1)

  return (
    <div className="clicks-chart">
      <h3 className="clicks-chart__title">Cliques por dia (últimos 30 dias)</h3>
      <div className="clicks-chart__bars">
        {data.map((day) => (
          <div className="clicks-chart__bar-wrapper" key={day._id}>
            <span className="clicks-chart__bar-value">{day.total}</span>
            <div
              className="clicks-chart__bar"
              style={{ height: `${(day.total / maxTotal) * 100}%` }}
            />
            <span className="clicks-chart__bar-label">{formatLabel(day._id)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClicksChart

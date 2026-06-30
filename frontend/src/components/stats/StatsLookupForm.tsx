import { useState } from "react"
import type { FormEvent } from "react"
import Spinner from "../ui/Spinner.js"

interface StatsLookupFormProps {
  initialSlug?: string
  onSubmit: (slug: string) => void
  loading?: boolean
}

function StatsLookupForm({ initialSlug = "", onSubmit, loading = false }: StatsLookupFormProps) {
  const [value, setValue] = useState(initialSlug)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!value.trim()) return
    onSubmit(value.trim())
  }

  return (
    <form className="stats-lookup-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="slug-input" className="sr-only">Código do link</label>
        <input
          id="slug-input"
          type="text"
          className="input"
          placeholder="Digite o código do link (ex: aZ3kP9)"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? <Spinner /> : "Buscar"}
        </button>
      </div>
    </form>
  )
}

export default StatsLookupForm

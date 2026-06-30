import { Link } from "react-router-dom"
import CopyButton from "../ui/CopyButton.js"
import type { ShortenResult } from "../../types/index.js"

interface UrlResultProps {
  result: ShortenResult
}

function UrlResult({ result }: UrlResultProps) {
  return (
    <div className="url-result">
      <div className="url-result__info">
        <a href={result.shorturl} target="_blank" rel="noreferrer" className="url-result__link">
          {result.shorturl}
        </a>
        <p className="url-result__original" title={result.originalUrl}>
          {result.originalUrl}
        </p>
      </div>
      <div className="url-result__actions">
        <CopyButton value={result.shorturl} />
        <Link to={`/stats/${result.slug}`} className="btn btn--ghost">
          Ver estatísticas
        </Link>
      </div>
    </div>
  )
}

export default UrlResult

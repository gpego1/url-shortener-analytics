import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/" className="btn btn--primary">Voltar para o início</Link>
    </div>
  )
}

export default NotFoundPage

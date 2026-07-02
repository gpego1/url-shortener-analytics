import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import AuthCard from "../components/auth/AuthCard.js"
import LoginForm from "../components/auth/LoginForm.js"
import type { LoginPayload } from "../api/authService.js"
import { useAuth } from "../context/AuthContext.js"
import { getApiErrorMessage } from "../lib/errorHandler.js"

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (data: LoginPayload) => {
    setError(null)
    setLoading(true)
    try {
      await login(data)
      navigate("/encurtar")
    } catch (err) {
      const { message } = getApiErrorMessage(err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <AuthCard
        title="Entrar"
        subtitle="Acesse sua conta para gerenciar seus links."
        footer={
          <p>
            Não tem uma conta? <Link to="/register">Criar conta</Link>
          </p>
        }
      >
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
      </AuthCard>
    </div>
  )
}

export default LoginPage

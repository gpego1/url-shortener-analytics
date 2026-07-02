import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import AuthCard from "../components/auth/AuthCard.js"
import RegisterForm from "../components/auth/RegisterForm.js"
import type { RegisterPayload } from "../api/authService.js"
import { useAuth } from "../context/AuthContext.js"
import { getApiErrorMessage } from "../lib/errorHandler.js"

function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (data: RegisterPayload) => {
    setError(null)
    setLoading(true)
    try {
      await register(data)
      navigate("/login")
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
        title="Criar conta"
        subtitle="Cadastre-se para começar a encurtar e rastrear seus links."
        footer={
          <p>
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
        }
      >
        <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
      </AuthCard>
    </div>
  )
}

export default RegisterPage

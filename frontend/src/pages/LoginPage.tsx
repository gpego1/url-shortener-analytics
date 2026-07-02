import { Link } from "react-router-dom"
import { useState } from "react"
import AuthCard from "../components/auth/AuthCard.js"
import LoginForm from "../components/auth/LoginForm.js"
import type { LoginPayload } from "../types/index.js"
import api from "../api/client.js"
import { getApiErrorMessage } from "../lib/errorHandler.js"

function LoginPage() {
  
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (data: LoginPayload) => {
    try {
        const response = await api.post("/api/auth/login", {
        email: data.email,
        password: data.password
      })
      console.log(response)
    } catch (err) {
      const { message } = getApiErrorMessage(err)
      setError(message)
    } finally {
      console.log(data)
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
        <LoginForm onSubmit={handleLogin} />
      </AuthCard>
    </div>
  )
}

export default LoginPage

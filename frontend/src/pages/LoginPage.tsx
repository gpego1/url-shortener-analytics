import { Link } from "react-router-dom"
import AuthCard from "../components/auth/AuthCard.js"
import LoginForm from "../components/auth/LoginForm.js"
import type { LoginPayload } from "../types/index.js"

function LoginPage() {
  const handleLogin = (data: LoginPayload) => {
    // TODO: integrar com POST /api/auth/login
    console.log(data)
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

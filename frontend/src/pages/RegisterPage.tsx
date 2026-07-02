import { Link } from "react-router-dom"
import AuthCard from "../components/auth/AuthCard.js"
import RegisterForm from "../components/auth/RegisterForm.js"
import type { RegisterPayload } from "../types/index.js"

function RegisterPage() {
  const handleRegister = (data: RegisterPayload) => {
    // TODO: integrar com POST /api/auth/register
    console.log(data)
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
        <RegisterForm onSubmit={handleRegister} />
      </AuthCard>
    </div>
  )
}

export default RegisterPage

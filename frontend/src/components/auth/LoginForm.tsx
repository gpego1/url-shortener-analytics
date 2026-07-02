import { useState } from "react"
import type { FormEvent } from "react"
import PasswordInput from "../ui/PasswordInput.js"
import ErrorMessage from "../ui/ErrorMessage.js"
import Spinner from "../ui/Spinner.js"
import type { LoginPayload } from "../../api/authService.js"

interface LoginFormProps {
  onSubmit: (data: LoginPayload) => void
  loading?: boolean
  error?: string | null
}

function LoginForm({ onSubmit, loading = false, error = null }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password) return
    onSubmit({ email: email.trim(), password })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="login-email" className="form-label">E-mail</label>
        <input
          id="login-email"
          type="email"
          className="input"
          placeholder="voce@email.com"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password" className="form-label">Senha</label>
        <PasswordInput
          id="login-password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          disabled={loading}
          required
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
        {loading ? <Spinner /> : "Entrar"}
      </button>
    </form>
  )
}

export default LoginForm

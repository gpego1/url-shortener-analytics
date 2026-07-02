import { useState } from "react"
import type { FormEvent } from "react"
import PasswordInput from "../ui/PasswordInput.js"
import ErrorMessage from "../ui/ErrorMessage.js"
import Spinner from "../ui/Spinner.js"
import type { RegisterPayload } from "../../api/authService.js"

interface RegisterFormProps {
  onSubmit: (data: RegisterPayload) => void
  loading?: boolean
  error?: string | null
}

function RegisterForm({ onSubmit, loading = false, error = null }: RegisterFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [mismatch, setMismatch] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !email.trim() || !password) return

    if (password !== confirmPassword) {
      setMismatch(true)
      return
    }

    setMismatch(false)
    onSubmit({ name: name.trim(), email: email.trim(), password })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="register-name" className="form-label">Nome</label>
        <input
          id="register-name"
          type="text"
          className="input"
          placeholder="Seu nome"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-email" className="form-label">E-mail</label>
        <input
          id="register-email"
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
        <label htmlFor="register-password" className="form-label">Senha</label>
        <PasswordInput
          id="register-password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          disabled={loading}
          minLength={6}
          required
        />
        <span className="form-hint">Mínimo de 6 caracteres.</span>
      </div>

      <div className="form-group">
        <label htmlFor="register-confirm-password" className="form-label">Confirmar senha</label>
        <PasswordInput
          id="register-confirm-password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          disabled={loading}
          required
        />
      </div>

      {mismatch && <ErrorMessage message="As senhas não coincidem." />}
      {error && <ErrorMessage message={error} />}

      <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
        {loading ? <Spinner /> : "Criar conta"}
      </button>
    </form>
  )
}

export default RegisterForm

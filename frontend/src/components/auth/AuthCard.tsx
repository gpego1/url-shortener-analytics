import type { ReactNode } from "react"

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__title">{title}</h1>
        {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
      </div>
      {children}
      {footer && <div className="auth-card__footer">{footer}</div>}
    </div>
  )
}

export default AuthCard

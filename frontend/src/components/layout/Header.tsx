import { NavLink } from "react-router-dom"

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <NavLink to="/encurtar" className="header__brand">
          <img src="/favicon.svg" alt="" className="header__logo" />
          <span>
            short<span className="header__brand-accent">.ly</span>
          </span>
        </NavLink>
        <nav className="header__nav">
          <NavLink
            to="/encurtar"
            className={({ isActive }) => `header__link ${isActive ? "header__link--active" : ""}`}
          >
            Início
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) => `header__link ${isActive ? "header__link--active" : ""}`}
          >
            Estatísticas
          </NavLink>
        </nav>
        <div className="header__auth">
          <NavLink to="/login" className="btn btn--ghost btn--sm">
            Entrar
          </NavLink>
          <NavLink to="/register" className="btn btn--primary btn--sm">
            Criar conta
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header

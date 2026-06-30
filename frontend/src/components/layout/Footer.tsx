function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">&copy; {new Date().getFullYear()} short.ly — Encurtador de URLs</p>
        <nav className="footer__links">
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#" rel="noreferrer">Documentação</a>
          <a href="#" rel="noreferrer">Privacidade</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

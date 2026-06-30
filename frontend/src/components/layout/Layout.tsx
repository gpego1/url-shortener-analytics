import { Outlet } from "react-router-dom"
import Header from "./Header.js"
import Footer from "./Footer.js"

function Layout() {
  return (
    <>
      <Header />
      <main className="page">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout

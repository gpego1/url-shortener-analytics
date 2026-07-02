import { Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/layout/Layout.js'
import HomePage from './pages/HomePage.js'
import StatsPage from './pages/StatsPage.js'
import LoginPage from './pages/LoginPage.js'
import RegisterPage from './pages/RegisterPage.js'
import NotFoundPage from './pages/NotFoundPage.js'
import { AuthProvider } from "./context/AuthContext.js"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="encurtar" element={<HomePage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="stats/:slug" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App

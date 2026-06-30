import { Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/layout/Layout.js'
import HomePage from './pages/HomePage.js'
import StatsPage from './pages/StatsPage.js'
import NotFoundPage from './pages/NotFoundPage.js'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="stats/:slug" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App

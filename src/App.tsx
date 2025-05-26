// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Packages } from './pages/Packages'
export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/packages" element={<Packages />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

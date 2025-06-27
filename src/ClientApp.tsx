import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/client/Sidebar'
import { ClientHome } from './pages/client/ClientHome'

export function ClientApp() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/client/home" element={<ClientHome />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

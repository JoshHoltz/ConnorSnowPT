import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/client/Sidebar'
import { ClientHome } from './pages/client/ClientHome'
import { Booking } from './pages/client/Booking'

export function ClientApp() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/client/home" element={<ClientHome />} />
            <Route path="client/booking" element={<Booking />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

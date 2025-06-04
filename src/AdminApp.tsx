// src/AdminApp.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminHome } from './pages/admin/AdminHome'
import { Sidebar } from './components/admin/Sidebar'
import { AdminClients } from './pages/admin/AdminClients'
import ViewClient  from './pages/admin/ViewClient';

export function AdminApp() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/AdminClients" element={<AdminClients />} />
            <Route path="/admin/ViewClient" element={<ViewClient />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

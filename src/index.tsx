// src/index.tsx
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AdminApp } from './AdminApp'

const isAdminRoute = window.location.pathname.startsWith('/admin')

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    {isAdminRoute ? <AdminApp /> : <App />}
  </React.StrictMode>
)

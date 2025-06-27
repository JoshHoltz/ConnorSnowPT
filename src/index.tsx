// src/index.tsx
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AdminApp } from './AdminApp'
import { ClientApp } from './ClientApp'

const pathname = window.location.pathname

let RenderApp = App

if (pathname.startsWith('/admin')) {
  RenderApp = AdminApp
} else if (pathname.startsWith('/client')) {
  RenderApp = ClientApp
}

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <RenderApp />
  </React.StrictMode>
)

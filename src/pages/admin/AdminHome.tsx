import React from 'react'
import { TopLevelInfo } from '../../components/admin/TopLevelInfo'
import { QuickLinks } from '../../components/admin/QuickLinks'

export const AdminHome = () => {
  return (
    <div className="mb-4 text-black">
      <h1 className="hidden md:flex text-2xl font-bold text-black px-6">Dashboard</h1>
      <p className="hidden md:flex text-black px-6">
        Welcome Back! Take a look at your client overview:
      </p>

      <TopLevelInfo />
      <QuickLinks />
    </div>
  )
}

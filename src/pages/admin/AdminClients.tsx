import React from 'react'
import { TopLevelInfo } from '../../components/admin/TopLevelInfo'
import { MembersTable } from '../../components/admin/MembersTable'

export const AdminClients = () => {
  return (
        <div className="mb-4 text-black">
      <h1 className="hidden md:flex text-2xl font-bold text-black px-8">Clients</h1>
      <p className="hidden md:flex text-black px-8">
        View and Manage Your Clients
      </p>
    <TopLevelInfo />
    <MembersTable />
    </div>
  )
}

import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { ClientWelcome } from '../../components/client/ClientWelcome'
import { OverviewComponent } from '../../components/client/Overview'

export const ClientHome = () => {
  const [searchParams] = useSearchParams()
  const clientId = searchParams.get('id')

  return (
    <div className="mb-4 text-black">
      <ClientWelcome clientId={clientId} />
      {/* <OverviewComponent /> */}
    </div>
  )
}

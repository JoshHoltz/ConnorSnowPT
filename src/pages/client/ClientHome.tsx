import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ClientWelcome } from '../../components/client/ClientWelcome'
import { PRs } from '../../components/client/PRs'
import { UpcomingWorkout } from '../../components/client/UpcomingWorkout'
import { MotivationMessage } from '../../components/client/Motivation'

function getToken() {
  const user_id = sessionStorage.getItem('user_id')
  const user_username = sessionStorage.getItem('user_username')
  if (user_id && user_username) {
    return { user_id, user_username }
  }
  return null
}

export const ClientHome = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const clientId = searchParams.get('id')

  useEffect(() => {
    const token = getToken()

    if (!clientId && token?.user_id) {
      navigate(`/client/home?id=${token.user_id}`, { replace: true })
    }

    if (!token) {
      navigate('/login', { replace: true }) 
    }
  }, [clientId, navigate])

  return (
    <div className="mb-4 text-black">
      <ClientWelcome clientId={clientId} />
      <MotivationMessage />
      <div className='flex'>
        <UpcomingWorkout />
        <PRs clientId={clientId} />
      </div>
    </div>
  )
}

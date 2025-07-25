import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminPlansGrid } from '../../components/admin/Components/PlansGrid'

function getToken() {
  const user_id = sessionStorage.getItem('user_id')
  const user_username = sessionStorage.getItem('user_username')
  const isAdmin = sessionStorage.getItem('isAdmin') // "Y" or "N"
  if (user_id && user_username && isAdmin) {
    return { user_id, user_username, isAdmin }
  }
  return null
}

export const AdminPlans = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()

    if (!token || token.isAdmin !== 'Y') {
      navigate('/forbidden', { replace: true })
      window.location.reload(); 
    }
  }, [navigate])

  return (
    <div className="mb-4 text-black">
      <h1 className="hidden md:flex text-2xl font-bold text-black px-8">Plans</h1>
      <p className="hidden md:flex text-black px-8">
        View and Manage Your Plans
      </p>
      <AdminPlansGrid />
    </div>
  )
}

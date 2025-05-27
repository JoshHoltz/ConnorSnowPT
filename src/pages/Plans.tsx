import React from 'react'
import { PlansGrid } from '../components/PlansGrid'
import { TrainingGuideHeader } from '../components/TrainingGuideHeader'    

export const Plans = () => {
  return (
    <div className="mt-10">
      <TrainingGuideHeader />
      <PlansGrid />
    </div>
  )
}

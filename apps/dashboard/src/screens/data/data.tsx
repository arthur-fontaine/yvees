import React from 'react'

import { ChartVisits } from './components/charts-visits'
import { useData } from './hooks/use-data'

/**
 * Data screen.
 */
export function Data() {
  const { user } = useData()
  return (
      <div className="h-screen p-10">
          <h1 className="text-3xl font-bold my-8">
              Bienvenue sur les données de ton musée
              {' '}
              {user?.username ? user.username : ''}
              {' '}
              :
          </h1>
          <ChartVisits />
      </div>
  )
}

import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Box } from 'ui'

import { Joystick } from './components/joystick'
import { useMoveCar } from './hooks/use-car-move'
import { DefaultLayout } from '../../shared/layouts/default-layout'

/**
 * The session manual screen of the application.
 */
export function SessionManualScreen() {
  const { moveCar } = useMoveCar()

  const { width } = useWindowDimensions()

  return (
      <DefaultLayout>
          <Box alignItems="center" flex={1} justifyContent="center">
              <Joystick
                nippleFactor={0.5}
                onMove={payload => moveCar(payload.position)}
                onMoveEnd={payload => moveCar(payload.position)}
                onMoveStart={payload => moveCar(payload.position)}
                radius={width / 4}
              />
          </Box>
      </DefaultLayout>
  )
}

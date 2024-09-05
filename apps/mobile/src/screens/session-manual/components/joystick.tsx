// This component comes mostly from https://github.com/KorSoftwareSolutions/react-native-joystick/blob/c9322186d1e9ecd335e7cc4e290f5da4d8e056cb/src/index.tsx

import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useMemo, useState } from 'react'
import { Platform } from 'react-native'
import type { GestureTouchEvent } from 'react-native-gesture-handler'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useTheme } from 'tamagui'
import { Box, Icon } from 'ui'

import type { Coordinates } from '../../../types/coordinates'

interface OnMoveEventPayload {
  angle: {
    degree: number
    radian: number
  }
  distance: number
  force: number
  position: Coordinates
}

interface JoystickProps {
  nippleFactor?: number
  onMove?: (payload: OnMoveEventPayload) => void
  onMoveEnd?: (payload: OnMoveEventPayload) => void
  onMoveStart?: (payload: OnMoveEventPayload) => void
  radius?: number
}

/**
 * Joystick component.
 */
export function Joystick(props: JoystickProps) {
  const { nippleRadius, panGesture, radius, x, y }
    = useJoystickController(props)

  const {
    brown: { val: brownColor },
    silver: { val: silverColor },
    silverDark: { val: silverDarkColor },
  } = useTheme()

  // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
  const frame = useMemo(() => (
      <>
          <Box
            backgroundColor="#E9D8CC"
            borderColor={`${brownColor}1E`}
            borderRadius={radius}
            borderWidth={1}
            height={2 * radius - 8}
            left={4}
            pointerEvents="none"
            position="absolute"
            top={4}
            width={2 * radius - 8}
          />
          <Box
            bottom={0}
            left={0}
            opacity={0.5}
            position="absolute"
            right={0}
            top={0}
          >
              <Icon.ChevronDown
                color="#956C66"
                size={24}
                style={{
            bottom: 12,
            left: radius - 12,
            position: 'absolute',
          }}
              />
              <Icon.ChevronLeft
                color="#956C66"
                size={24}
                style={{
            left: 12,
            position: 'absolute',
            top: radius - 12,
          }}
              />
              <Icon.ChevronRight
                color="#956C66"
                size={24}
                style={{
            position: 'absolute',
            right: 12,
            top: radius - 12,
          }}
              />
              <Icon.ChevronUp
                color="#956C66"
                size={24}
                style={{
            left: radius - 12,
            position: 'absolute',
            top: 12,
          }}
              />
          </Box>
      </>
  ), [brownColor, radius])

  // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
  const nippleBackground = useMemo(() => (
      <>
          <LinearGradient
            colors={[silverColor, silverDarkColor]}
            end={[-1, -1]}
            start={[1, 1]}
            style={{
          borderRadius: nippleRadius,
          height: 2 * nippleRadius,
          position: 'absolute',
          width: 2 * nippleRadius,
          zIndex: 1,
        }}
          />
          <LinearGradient
            colors={[silverDarkColor, silverColor]}
            end={[-1, -1]}
            start={[1, 1]}
            style={{
          borderRadius: nippleRadius,
          height: 2 * nippleRadius - 32,
          left: 16,
          position: 'absolute',
          top: 16,
          width: 2 * nippleRadius - 32,
          zIndex: 2,
        }}
          />
      </>
  ), [nippleRadius, silverColor, silverDarkColor])

  return (
      <GestureDetector gesture={panGesture}>
          <Box
            backgroundColor={`${brownColor}14`}
            borderRadius={radius}
            height={2 * radius}
            transform={[{ rotateX: '180deg' }]}
            width={2 * radius}
          >
              {frame}
              <Box
                borderRadius={nippleRadius}
                height={2 * nippleRadius}
                pointerEvents="none"
                position="absolute"
                transform={[{ translateX: x }, { translateY: y }]}
                width={2 * nippleRadius}
              >
                  {nippleBackground}
              </Box>
          </Box>
      </GestureDetector>
  )
}

function useJoystickController(props: JoystickProps) {
  const wrapperRadius = props.radius ?? 100
  const nippleFactor = props.nippleFactor ?? 0.33
  const nippleRadius = wrapperRadius * nippleFactor

  const [x, setX] = useState(wrapperRadius - nippleRadius)
  const [y, setY] = useState(wrapperRadius - nippleRadius)

  const handleTouchMove = useCallback(
    (event: GestureTouchEvent) => {
      const [changedTouch] = event.changedTouches

      if (changedTouch === undefined) {
        return
      }

      const fingerX = changedTouch.x
      const fingerY = Platform.OS === 'web' ? (wrapperRadius * 2 - changedTouch.y) : changedTouch.y
      const fingerCoordinates = { x: fingerX, y: fingerY } satisfies Coordinates

      const wrapperCoordinates
        = { x: wrapperRadius, y: wrapperRadius } satisfies Coordinates

      const degreeAngle = calcDegreeAngle(fingerCoordinates, wrapperCoordinates)
      const virtualDistance
        = calcDistance(wrapperCoordinates, fingerCoordinates)
      const force = virtualDistance / (nippleRadius * 2)

      const distance = Math.min(virtualDistance, wrapperRadius)

      let coordinates = {
        x: fingerX - nippleRadius,
        y: fingerY - nippleRadius,
      }

      if (distance === wrapperRadius) {
        coordinates = findCoordinates(wrapperCoordinates, distance, degreeAngle)
        coordinates = {
          x: coordinates.x - nippleRadius,
          y: coordinates.y - nippleRadius,
        }
      }

      setX(coordinates.x)
      setY(coordinates.y)

      props.onMove?.({
        angle: {
          degree: degreeAngle,
          radian: degreesToRadians(degreeAngle),
        },
        distance: distance / wrapperRadius,
        force,
        position: {
          x: (coordinates.x + nippleRadius) / wrapperRadius - 1,
          y: (coordinates.y + nippleRadius) / wrapperRadius - 1,
        },
      })
    },
    [nippleRadius, wrapperRadius, props.onMove],
  )

  const handleTouchEnd = useCallback(() => {
    setX(wrapperRadius - nippleRadius)
    setY(wrapperRadius - nippleRadius)

    props.onMoveEnd?.({
      angle: {
        degree: 0,
        radian: 0,
      },
      distance: 0,
      force: 0,
      position: {
        x: 0,
        y: 0,
      },
    })
  }, [nippleRadius, wrapperRadius, props.onMoveEnd])

  const handleTouchStart = useCallback(() => {
    props.onMoveStart?.({
      angle: {
        degree: 0,
        radian: 0,
      },
      distance: 0,
      force: 0,
      position: {
        x: 0,
        y: 0,
      },
    })
  }, [props.onMoveStart])

  const panGesture = Gesture.Pan()
    .onStart(handleTouchStart)
    .onEnd(handleTouchEnd)
    .onTouchesMove(handleTouchMove)

  return {
    nippleRadius,
    panGesture,
    radius: wrapperRadius,
    x,
    y,
  }
}

/* utils */

function degreesToRadians(a: number) {
  return a * (Math.PI / 180)
}

function radiansToDegrees(a: number) {
  return a * (180 / Math.PI)
}

function findCoordinates(
  position: { x: number, y: number },
  distance: number,
  angle: number,
) {
  const b = { x: 0, y: 0 }
  angle = degreesToRadians(angle)
  b.x = position.x + distance * Math.cos(angle)
  b.y = position.y + distance * Math.sin(angle)
  if (b.y < 0) {
    b.y += 150
  }
  return b
}

function calcDistance(position1: Coordinates, position2: Coordinates) {
  const dx = position2.x - position1.x
  const dy = position2.y - position1.y

  return Math.sqrt(dx * dx + dy * dy)
}

function calcDegreeAngle(position1: Coordinates, position2: Coordinates) {
  const dx = position2.x - position1.x
  const dy = position2.y - position1.y

  const rawAngle = radiansToDegrees(Math.atan2(dy, dx))

  const angle
    = rawAngle < 0 ? 180 - Math.abs(rawAngle)
      : rawAngle + 180

  return angle
}

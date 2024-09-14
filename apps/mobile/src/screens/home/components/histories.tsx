import React, { useEffect } from 'react'
import { Animated, Easing, ScrollView, Text, View, useAnimatedValue } from 'react-native'
import { Icon, Title1, useTheme } from 'ui'

import type { JoinCard } from './join-card'
import { useVisitData } from '../hooks/use-visit-data'

function formatDate(dateString: Date) {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface HistoriesProps {
  onOpenCameraRef: Parameters<typeof JoinCard>[0]['onOpenCameraRef']
}

/**
 * Component to display the user's visit history.
 */
export function Histories(props: HistoriesProps) {
  const { loading, visits } = useVisitData()
  const { opacity } = useHistoriesAnimation(props)
  const { cardBackgroundColor } = useTheme()
  if (loading) {
      return (<Text>Chargement...</Text>)
  }
  return (
      <Animated.View
        style={{
          backgroundColor: cardBackgroundColor.val,
          borderRadius: 28,
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: -16,
          marginTop: 20,
          opacity,
          padding: 32,
          zIndex: -1,
        }}
      >
          <View
            style={{
          alignItems: 'center',
          alignSelf: 'flex-start',
          flexDirection: 'row',
          marginBottom: 10,
        }}
          >
              <Icon.History color="orange" size={24} style={{ marginRight: 8 }} />
              <Title1 variant="default">Historique</Title1>
          </View>
          {visits && visits.length === 0 && (
          <Text>Aucune visite disponible.</Text>
          )}
          <ScrollView style={{ width: '100%' }}>
              {visits && visits.map(visit => (
                  <View key={visit.id}>
                      <View
                        style={{
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#eee',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 12,
                      }}
                      >
                          <Icon.Image color="orange" size={24} style={{ marginBottom: 5 }} />
                          <View>
                              <Text style={{ color: '#000', fontWeight: '600' }}>
                                  {visit.journey?.name}
                              </Text>
                              <Text>
                                  Visité le
                                  {' '}
                                  {formatDate(visit.createdAt)}
                              </Text>
                          </View>
                          <Icon.ChevronRight color="orange" size={24} />
                      </View>
                  </View>
            ))}
          </ScrollView>
      </Animated.View>
  )
}

function useHistoriesAnimation(props: HistoriesProps) {
  const animatedOpacity = useAnimatedValue(1)

  useEffect(() => {
    // eslint-disable-next-line ts/naming-convention
    const ANIMATION_EASING = Easing.circle
    const ANIMATION_DURATION = 500

    props.onOpenCameraRef.current = (isCameraOpen) => {
      Animated
        .timing(animatedOpacity, {
          delay: isCameraOpen ? 0 : ANIMATION_DURATION,
          duration: ANIMATION_DURATION,
          easing: ANIMATION_EASING,
          toValue: isCameraOpen ? 0 : 1,
          useNativeDriver: true,
        })
        .start()
    }
  }, [])

  return {
    opacity: animatedOpacity,
  }
}

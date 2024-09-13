import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Sheet as TamaguiSheet } from 'tamagui'

import { Title1 } from './typographies/title1'

interface SheetProps {
    children?: string
    imageLink?: string
    open?: boolean
    title?: string
  }

/**
 *
 */
export function Sheet({ children, imageLink, open: _open = true, title }: SheetProps) {
    const [position, setPosition] = useState(0)
    const [open, setOpen] = useState(_open)
    const snapPoints = [70, 10]

    useEffect(() => { setOpen(_open) }, [_open])

    return (
      <>
        <TamaguiSheet
          animation="medium"
          dismissOnSnapToBottom={false}
          forceRemoveScrollEnabled={open}
          onOpenChange={setOpen}
          onPositionChange={setPosition}
          open={open}
          position={position}
          snapPoints={snapPoints}
        >
          <TamaguiSheet.Overlay
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <TamaguiSheet.Handle />
          <TamaguiSheet.Frame backgroundColor="$white" borderTopLeftRadius={28} borderTopRightRadius={28} justifyContent="flex-start" paddingBottom={8} paddingHorizontal={36} paddingTop={32} width="100%">
              {imageLink &&
              <Image
                source={{ uri: imageLink }}
                style={{ resizeMode:'cover', borderRadius: 24, width: '100%', maxHeight: 200, height: 200, marginBottom: 16, objectPosition: 'center' }}
              />
              }
              <Title1 variant="default">{title}</Title1>
              {children}
          </TamaguiSheet.Frame>
        </TamaguiSheet>
      </>
    )
}

import React, { useEffect, useState } from 'react'
import { Sheet as TamaguiSheet } from 'tamagui'
import { Title1 } from './typographies/title1'

interface SheetProps {
    children?: string
    open?: boolean
    title? : string;
  }

export function Sheet({ children, open: _open = true, title }: SheetProps) {
    const [position, setPosition] = useState(0)
    const [open, setOpen] = useState(_open)
    const snapPoints = [55, 10]

    useEffect(() => { setOpen(_open) }, [_open])

    return (
      <>
        <TamaguiSheet
        forceRemoveScrollEnabled={open}
        open={open}
        onOpenChange={setOpen}
        snapPoints={snapPoints}
        dismissOnSnapToBottom={false}
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
        >
          <TamaguiSheet.Overlay
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <TamaguiSheet.Handle />
          <TamaguiSheet.Frame width="110%" paddingTop={32} borderTopRightRadius={28} borderTopLeftRadius={28} paddingBottom={8} paddingLeft={36} backgroundColor='$white' justifyContent='flex-start'>
            <Title1 variant={'default'}>{title}</Title1>
            {children}
          </TamaguiSheet.Frame>
        </TamaguiSheet>
      </>
    )
}

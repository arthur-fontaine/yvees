import React, { useEffect, useState } from 'react'
import { Sheet as TamaguiSheet } from 'tamagui'

interface SheetProps {
    children?: string
    open?: boolean
}

/**
 *
 */
export function Sheet({ children, open: _open = true }: SheetProps) {
    const [position, setPosition] = useState(0)
    const [open, setOpen] = useState(_open)
    const snapPoints = [85, 50, 25]

    useEffect(() => { setOpen(_open) }, [_open])

    return (
      <>
        <TamaguiSheet
          open={open}
        >
          <TamaguiSheet.Overlay
            unstyled
          />

          <TamaguiSheet.Handle />
          <TamaguiSheet.Frame
            unstyled
          >
            {children}
          </TamaguiSheet.Frame>
        </TamaguiSheet>
      </>
    )
}

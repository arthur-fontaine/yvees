import React from 'react'
import { Sheet as TamaguiSheet } from 'tamagui'
import { useState, useEffect } from 'react'


interface SheetProps {
    children?: string
    open?: boolean;
}

export const Sheet = ({ children, open: _open = false }: SheetProps) => {

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
                    unstyled>
                    {children}
                </TamaguiSheet.Frame>
            </TamaguiSheet>
        </>
    )
}

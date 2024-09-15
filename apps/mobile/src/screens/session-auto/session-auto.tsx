import React from 'react'

import { IntroductionPopup } from './components/introduction-popup'
import { CarCamera } from '../../shared/components/car-camera'
import { DefaultLayout } from '../../shared/layouts/default-layout'

/**
 * The session auto screen of the application.
 */
export function SessionAutoScreen() {
    return (
        <DefaultLayout>
            <CarCamera />
            <IntroductionPopup />
        </DefaultLayout>
    )
}

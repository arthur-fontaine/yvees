import React, { useState } from 'react'
import { Card } from 'ui'
// import { createRoute } from 'agrume';

import { DefaultLayout } from '../../shared/layouts/default-layout'

// const getSessionPage = createRoute(
//   async () => {},
//   {
//     path: '/session-auto',
//   }
// );

/****/
export function SessionAutoScreen() {
  const [displayCard, setDisplayCard] = useState(true)

  return (
    <DefaultLayout>
      {displayCard && (
        <Card
          action={{
            onClick: () => setDisplayCard(false),
            text: 'Commencer',
          }}
          text="Yvees est votre guide personnel pour cette visite ! Pilotez-le, trouvez les QR Codes situés en-dessous des oeuvres du musée, et scannez-les avec la caméra de votre Yvees. Des informations complémentaires apparaîtront sur votre téléphone."
          title="Pilotez votre Yvees"
          variant="default"
        />
      )}
    </DefaultLayout>
  )
}

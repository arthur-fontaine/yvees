import React from 'react'
import type { GetProps } from 'tamagui'
import { Paragraph, Card as TamaguiCard } from 'tamagui'

import { Button } from './button'
import { Title1 } from './typographies/title1'
import { withVariants } from '../utils/with-variants'

interface CardProps {
  action?: {
    onClick: () => void
    text: string
  }
  text?: string | undefined
  title?: string | undefined
}

export const Card = withVariants<
  'default',
  GetProps<typeof TamaguiCard>
>(
  {
    $defaults: {
      backgroundColor: '#FFFBF5',
      borderRadius: 28,
      borderWidth: 0,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      cursor: 'pointer',
      flexDirection: 'column',
      fontSize: '$button',
      fontWeight: '$button',
      margin: 9,
      padding: 36,
    },
    default: {
    },
  },
)(
  ({ variant }, { action, text, title }: CardProps) => {
    return (
      <TamaguiCard
        {...variant}
        unstyled
      >
        <Title1 variant="default">{title}</Title1>
        <Paragraph
          fontSize="12"
          fontfamily="Montserrat-Regular"
          paddingBottom={24}
          paddingTop={8}
          theme="alt2"
        >
          {text}
        </Paragraph>

        {action && <Button onClick={action.onClick} variant="primary">{action.text}</Button>}
      </TamaguiCard>
    )
  },
)

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
      backgroundColor: '$$backgroundColor',
      borderRadius: 28,
      borderWidth: 0,
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
          fontFamily="$body"
          fontSize="$body"
          paddingBottom={24}
          paddingTop={8}
        >
          {text}
        </Paragraph>

        {action && <Button onClick={action.onClick} variant="primary">{action.text}</Button>}
      </TamaguiCard>
    )
  },
)

import React from 'react'
import type { GetProps } from 'tamagui'
import { Paragraph, Card as TamaguiCard } from 'tamagui'

import { Button } from './button'
import type { Icon } from './icon/icon'
import { Title1 } from './typographies/title1'
import { withVariants } from '../utils/with-variants'

interface CardProps {
  action?: {
    onClick: () => void
    text: string
  }
  icon?: typeof Icon[keyof typeof Icon] | undefined
  text?: string | undefined
  title?: string | undefined
}

export const Card = withVariants<
  'default',
  GetProps<typeof TamaguiCard>
>(
  {
    $defaults: {
      backgroundColor: '$cardBackgroundColor',
      borderRadius: '$card',
      borderWidth: 0,
      cursor: 'pointer',
      flexDirection: 'column',
      padding: '$card',
    },
    default: {
    },
  },
)(
  // eslint-disable-next-line ts/naming-convention
  ({ variant }, { action, icon: Icon, text, title }: CardProps) => {
    const ICON_SHIFT = 24
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

            {Icon && (
            <Icon
              bottom={-ICON_SHIFT}
              color="$orange"
              opacity={0.25}
              position="absolute"
              right={-ICON_SHIFT}
              size={192}
              strokeWidth={2.5}
              zIndex={-1}
            />
        )}
        </TamaguiCard>
    )
  },
)
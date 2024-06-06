import React from 'react'
import { CardProps, Card as TamaguiCard, Paragraph } from 'tamagui'
import { GetProps } from 'tamagui'
import { withVariants } from '../utils/with-variants'
import { Button } from './button';
import { Title1 } from './typographies/title1'

interface CardProps {
  title? : string;
  text?: string;
  action?: {
    text: string
    onClick: () => void
  }
}

export const Card = withVariants<
  'default',
  GetProps<typeof CardProps>
>(
  {
    $defaults: {
      borderRadius: 28,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderWidth: 0,
      cursor: 'pointer',
      backgroundColor: '#FFFBF5',
      fontSize: '$button',
      fontWeight: '$button',
      flexDirection: 'column',
      padding: 36,
      margin: 9,
    },
    default: {
      },
  },
)(
  ({ variant }, { text , title, action } : CardProps) => {
    return (
      <TamaguiCard unstyled
        {...variant}
      >
        <Title1 variant='default'>{title}</Title1>
        <Paragraph paddingTop={8} fontSize="12" 
        paddingBottom={24} fontfamily='Montserrat-Regular' theme="alt2">{text}</Paragraph>

        {action && <Button variant='primary' onClick={action.onClick}>{action.text}</Button>}
      </TamaguiCard>
    )
  },
)

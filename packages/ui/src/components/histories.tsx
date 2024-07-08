import React from 'react';
import type { GetProps } from 'tamagui';
import { ListItem, Separator, YGroup } from 'tamagui';
import { ChevronRight, History, Image } from '@tamagui/lucide-icons';
import { ListItem as TamaguiListItem } from 'tamagui';
import { Title1 } from './typographies/title1';
import { withVariants } from '../utils/with-variants';

interface ItemProps {
  place?: string | undefined;
  date?: string | undefined;

  action?: {
    onClick: () => void;
    text: string;
  };
}

interface HistoryProps {
  histories: ItemProps[];
}

export const Histories = withVariants<
  'default',
  GetProps<typeof TamaguiListItem>
>(
  {
    $defaults: {
      backgroundColor: '$white',
      borderRadius: 28,
      borderWidth: 0,
      cursor: 'pointer',
      flexDirection: 'column',
      margin: 9,
      overflow: 'hidden',
      padding: 36,
    },
    default: {},
  },
)(
  ({ variant }, { histories }: HistoryProps) => {
    return (
      <TamaguiListItem {...variant} unstyled>

        <History size="5px"/>
        <Title1 variant="default">History</Title1>

        <YGroup alignSelf="center" bordered width={240} size="5px" separator={<Separator />}>
          {histories.map((history, index) => (
            <YGroup.Item key={index}>
              <ListItem
                hoverTheme
                pressTheme
                title={history.place}
                subTitle={history.date}
                icon={Image}
                iconAfter={ChevronRight}
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </TamaguiListItem>
    );
  }
);

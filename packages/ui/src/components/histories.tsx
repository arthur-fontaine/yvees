import React from 'react';
import type { GetProps } from 'tamagui';
import { ListItem, YGroup, ScrollView, Paragraph } from 'tamagui';
import { ChevronRight, History, Image } from '@tamagui/lucide-icons';
import { ListItem as TamaguiListItem } from 'tamagui';
import { Title1 } from './typographies/title1';
import { withVariants } from '../utils/with-variants';
import { View } from 'react-native';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface Journey {
  name: string;
}

interface ItemProps {
  id?: number;
  createdAt: string;
  updatedAt?: string;
  userId?: number;
  journey_id?: number;
  ended_at?: number;
  journey?: Journey;

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
      cursor: 'pointer',
      flexDirection: 'column',
      padding: 32,
      gap: 10,
    },
    default: {},
  },
)(
  ({ variant }, { histories }: HistoryProps) => {
    return (
      <TamaguiListItem {...variant} style={{ flex: 1 }}>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}>
          <History variant="primary" size="$4" color="orange" />
          <Title1 variant="default">Historique</Title1>
        </View>

        <ScrollView style={{ overflow: 'scroll', width: '110%' }}>
          <YGroup>
            {histories.map((history, index) => {
              const formattedDate = formatDate(history.createdAt);

              return (
                <YGroup.Item key={index}>
                  <ListItem
                    title={
                      <View style={{ flexDirection: 'column' }}> 
                        <Paragraph variant="primary" style={{ fontWeight: '600' }}>
                          {history.journey?.name} 
                        </Paragraph>

                        <Paragraph>
                          Visité le {formattedDate} 
                        </Paragraph>
                      </View>
                    }
                    icon={<Image size="$5" color="orange" />}
                    iconAfter={<ChevronRight color="orange" />}
                  />
                </YGroup.Item>
              );
            })}
          </YGroup>
        </ScrollView>
      </TamaguiListItem>
    );
  }
);

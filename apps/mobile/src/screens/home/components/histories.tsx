import React from 'react';
import { ChevronRight, History, Image } from '@tamagui/lucide-icons';
import { ScrollView, View, Text } from 'react-native';
import { Title1 } from 'ui';

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

export const Histories = ({ histories }: HistoryProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        padding: 32,
        flexDirection: 'column',
        marginTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          marginBottom: 10,
        }}
      >
        <History size={24} color="orange" style={{ marginRight: 8 }} />
        <Title1 variant="default">Historique</Title1>
      </View>

      <ScrollView style={{ width: '100%' }}>
        <View>
          {histories.map((history, index) => {
            const formattedDate = formatDate(history.createdAt);

            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                }}
              >
                <Image size={24} color="orange" style={{ marginBottom: 5 }} />
                <View>
                  <Text style={{ fontWeight: '600', color: '#000' }}>
                    {history.journey?.name}
                  </Text>
                  <Text>Visité le {formattedDate}</Text>
                </View>

                <ChevronRight size={24} color="orange" />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

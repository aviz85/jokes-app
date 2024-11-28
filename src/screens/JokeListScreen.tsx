import React from 'react';
import { FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import type { JokeListScreenProps } from '../types/navigation';
import type { Joke } from '../types/jokes';

const mockJokes: Joke[] = [
  {
    id: '1',
    versions: [{ id: '1', content: 'Why did the chicken cross the road?', createdAt: new Date().toISOString() }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    versions: [{ id: '1', content: 'What do you call a bear with no teeth?', createdAt: new Date().toISOString() }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function JokeListScreen({ navigation }: JokeListScreenProps) {
  return (
    <>
      <FlatList
        data={mockJokes}
        renderItem={({ item }) => (
          <List.Item
            title={item.versions[0].content}
            onPress={() => navigation.navigate('JokeDetail', { joke: item })}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
        keyExtractor={item => item.id}
      />
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => navigation.navigate('EditJoke', {})}
      />
    </>
  );
} 
import React from 'react';
import { FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import type { JokeListScreenProps } from '../types/navigation';
import type { Joke } from '../types/jokes';

const mockJokes: Joke[] = [
  {
    id: 1,
    original: 'Why did the chicken cross the road?',
    status: 'active',
    rating: null,
    tags: null,
    created_at: new Date().toISOString(),
    is_deleted: false,
    joke_versions: [
      {
        id: 1,
        joke_id: 1,
        text: 'Why did the chicken cross the road?',
        type: 'original',
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString()
      }
    ]
  },
  {
    id: 2,
    original: 'What do you call a bear with no teeth?',
    status: 'active',
    rating: null,
    tags: null,
    created_at: new Date().toISOString(),
    is_deleted: false,
    joke_versions: [
      {
        id: 1,
        joke_id: 2,
        text: 'What do you call a bear with no teeth?',
        type: 'original',
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString()
      }
    ]
  }
];

export default function JokeListScreen({ navigation }: JokeListScreenProps) {
  return (
    <>
      <FlatList
        data={mockJokes}
        renderItem={({ item }) => (
          <List.Item
            title={item.original}
            onPress={() => navigation.navigate('JokeDetail', { joke: item })}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
        keyExtractor={item => item.id.toString()}
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
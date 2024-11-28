import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import type { Joke } from '../../src/types/jokes';
import { getJokes } from '../../src/services/jokes';

export default function JokeListScreen() {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    loadJokes();
  }, []);

  const loadJokes = async () => {
    try {
      const data = await getJokes();
      setJokes(data);
    } catch (error) {
      console.error('Failed to load jokes:', error);
    }
  };

  return (
    <>
      <FlatList
        data={jokes}
        renderItem={({ item }) => (
          <List.Item
            title={item.original}
            onPress={() => router.push({
              pathname: '/joke/[id]',
              params: { id: item.id.toString() }
            })}
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
        onPress={() => router.push({
          pathname: '/joke/new'
        })}
      />
    </>
  );
}

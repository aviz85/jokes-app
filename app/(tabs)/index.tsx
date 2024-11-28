import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import type { Joke } from '../../src/types/jokes';
import { getJokes } from '../../src/services/jokes';

const translations = {
  loading: 'טוען...',
  error: 'שגיאה בטעינת בדיחות',
  newJoke: 'בדיחה חדשה',
};

export default function JokeListScreen() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadJokes();
  }, []);

  const loadJokes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getJokes();
      setJokes(data);
    } catch (error) {
      console.error('Failed to load jokes:', error);
      setError('Failed to load jokes');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>{translations.error}</Text>;

  return (
    <>
      <FlatList
        style={{ direction: 'rtl' }}
        data={jokes}
        renderItem={({ item }) => (
          <List.Item
            title={item.original}
            titleStyle={{ textAlign: 'right' }}
            onPress={() => router.push({
              pathname: '/joke/[id]',
              params: { id: item.id.toString() }
            })}
            right={props => <List.Icon {...props} icon="chevron-left" />}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
      <FAB
        icon="plus"
        label={translations.newJoke}
        style={{
          position: 'absolute',
          margin: 16,
          left: 0,
          bottom: 0,
        }}
        onPress={() => router.push({ pathname: '/joke/new' })}
      />
    </>
  );
}

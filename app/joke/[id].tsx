import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton, Surface, Text } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import type { Joke } from '../../src/types/jokes';
import { mockJokes } from '../(tabs)';

const getJoke = (id: string): Joke | undefined => 
  mockJokes.find((joke: Joke) => joke.id === id);

export default function JokeScreen() {
  const { id } = useLocalSearchParams();
  const joke = getJoke(id as string);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  
  if (!joke) return <Text>Joke not found</Text>;
  
  const currentVersion = joke.versions[currentVersionIndex];

  return (
    <Surface style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyLarge">{currentVersion.content}</Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="chevron-left"
            onPress={() => setCurrentVersionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentVersionIndex === 0}
          />
          <Text variant="bodyMedium">
            Version {currentVersionIndex + 1} of {joke.versions.length}
          </Text>
          <IconButton
            icon="chevron-right"
            onPress={() => setCurrentVersionIndex(prev => Math.min(joke.versions.length - 1, prev + 1))}
            disabled={currentVersionIndex === joke.versions.length - 1}
          />
        </Card.Actions>
      </Card>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
}); 
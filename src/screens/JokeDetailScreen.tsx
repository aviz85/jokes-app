import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton, Surface, Text } from 'react-native-paper';
import type { Joke } from '../types/jokes';

type Props = {
  route: {
    params: {
      joke: Joke;
    };
  };
  navigation: any;
};

export default function JokeDetailScreen({ route, navigation }: Props) {
  const { joke } = route.params;
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const currentVersion = joke.versions[currentVersionIndex];

  const handleNextVersion = () => {
    if (currentVersionIndex < joke.versions.length - 1) {
      setCurrentVersionIndex(prev => prev + 1);
    }
  };

  const handlePrevVersion = () => {
    if (currentVersionIndex > 0) {
      setCurrentVersionIndex(prev => prev - 1);
    }
  };

  return (
    <Surface style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyLarge">{currentVersion.content}</Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="chevron-left"
            onPress={handlePrevVersion}
            disabled={currentVersionIndex === 0}
          />
          <Text variant="bodyMedium">
            Version {currentVersionIndex + 1} of {joke.versions.length}
          </Text>
          <IconButton
            icon="chevron-right"
            onPress={handleNextVersion}
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
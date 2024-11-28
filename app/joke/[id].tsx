import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, IconButton, TextInput } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import type { Joke, JokeVersion, EmojiRating as EmojiRatingType } from '../../src/types/jokes';
import { EmojiRating } from '../../src/components/EmojiRating';
import { getJoke, updateJokeRating, deleteJoke, createJokeVersion } from '../../src/services/jokes';

export default function JokeScreen() {
  const { id } = useLocalSearchParams();
  const [joke, setJoke] = useState<Joke & { joke_versions: JokeVersion[] }>();
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    loadJoke();
  }, [id]);

  const loadJoke = async () => {
    if (!id) return;
    try {
      const data = await getJoke(Number(id));
      setJoke(data);
    } catch (error) {
      console.error('Failed to load joke:', error);
    }
  };

  if (!joke || !joke.joke_versions) return <Text>Loading...</Text>;

  const currentVersion = joke.joke_versions?.[currentVersionIndex];

  const handleRating = async (rating: EmojiRatingType) => {
    try {
      await updateJokeRating(joke.id, rating);
      await loadJoke();
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  const startEditing = () => {
    setEditedContent(currentVersion?.text || '');
    setIsEditing(true);
  };

  const saveChanges = () => {
    // TODO: Save changes to DB
    setIsEditing(false);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          {isEditing && (
            <View style={styles.actions}>
              <View style={styles.actionItem}>
                <IconButton
                  icon="check"
                  onPress={saveChanges}
                />
                <Text variant="labelSmall">Save</Text>
              </View>
              <View style={styles.actionItem}>
                <IconButton
                  icon="close"
                  onPress={() => setIsEditing(false)}
                />
                <Text variant="labelSmall">Cancel</Text>
              </View>
            </View>
          )}

          <View style={styles.jokeContent}>
            {isEditing ? (
              <TextInput
                mode="outlined"
                value={editedContent}
                onChangeText={setEditedContent}
                multiline
                style={styles.editInput}
                autoFocus
                blurOnSubmit={true}
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
              />
            ) : (
              <Text variant="headlineMedium">{currentVersion?.text}</Text>
            )}
          </View>

          {!isEditing && (
            <>
              <View style={styles.versionNavigation}>
                <IconButton
                  icon="chevron-left"
                  onPress={() => setCurrentVersionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentVersionIndex === 0}
                />
                <Text variant="bodyMedium">
                  Version {currentVersionIndex + 1} of {joke.joke_versions?.length}
                </Text>
                <IconButton
                  icon="chevron-right"
                  onPress={() => setCurrentVersionIndex(prev => Math.min(joke.joke_versions?.length - 1 || 0, prev + 1))}
                  disabled={currentVersionIndex === joke.joke_versions?.length - 1}
                />
              </View>

              <View style={styles.viewActions}>
                <View style={styles.actionItem}>
                  <EmojiRating value={joke.rating} onChange={handleRating} />
                  <Text variant="labelSmall">Rate</Text>
                </View>
                <View style={styles.actionItem}>
                  <IconButton
                    icon="pencil"
                    onPress={startEditing}
                  />
                  <Text variant="labelSmall">Edit</Text>
                </View>
                <View style={styles.actionItem}>
                  <IconButton
                    icon="plus"
                    onPress={() => router.push({
                      pathname: '/joke/new',
                      params: { jokeId: joke.id, mode: 'new-version' }
                    })}
                  />
                  <Text variant="labelSmall">Version</Text>
                </View>
                <View style={styles.actionItem}>
                  <IconButton
                    icon="delete"
                    iconColor="red"
                    onPress={() => {
                      // TODO: Add delete confirmation
                      router.back();
                    }}
                  />
                  <Text variant="labelSmall" style={{ color: 'red' }}>Delete</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  jokeContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 80 : 60, // Extra padding for keyboard
  },
  editInput: {
    width: '100%',
    backgroundColor: 'transparent',
    maxHeight: '80%',
  },
  versionNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  viewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  actionItem: {
    alignItems: 'center',
  },
}); 
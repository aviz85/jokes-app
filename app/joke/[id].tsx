import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Text, IconButton, TextInput } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  runOnJS 
} from 'react-native-reanimated';
import type { Joke, JokeVersion, EmojiRating as EmojiRatingType } from '../../src/types/jokes';
import { EmojiRating } from '../../src/components/EmojiRating';
import { getJoke, updateJokeRating, deleteJoke, createJokeVersion } from '../../src/services/jokes';

const translations = {
  loading: 'טוען...',
  save: 'שמור',
  cancel: 'ביטול',
  version: `גרסה`,
  of: 'מתוך',
  rate: 'דרג',
  edit: 'ערוך',
  newVersion: 'גרסה חדשה',
  delete: 'מחק',
};

export default function JokeScreen() {
  const { id } = useLocalSearchParams();
  const [joke, setJoke] = useState<Joke & { joke_versions: JokeVersion[] }>();
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const translateY = useSharedValue(0);
  const SWIPE_THRESHOLD = 100;

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

  const goToNextVersion = () => {
    if (!joke?.joke_versions) return;
    if (currentVersionIndex < joke.joke_versions.length - 1) {
      setCurrentVersionIndex(prev => prev + 1);
    }
  };

  const goToPrevVersion = () => {
    if (currentVersionIndex > -1) {
      setCurrentVersionIndex(prev => prev - 1);
    }
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationY < -SWIPE_THRESHOLD) {
        runOnJS(goToNextVersion)();
      } else if (event.translationY > SWIPE_THRESHOLD) {
        runOnJS(goToPrevVersion)();
      }
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!joke) return <Text>{translations.loading}</Text>;

  const versions = joke.joke_versions || [];
  const totalVersions = versions.length + 1;
  const currentText = currentVersionIndex === -1 
    ? joke.original 
    : versions[currentVersionIndex].text;

  const handleRating = async (rating: EmojiRatingType) => {
    try {
      await updateJokeRating(joke.id, rating);
      await loadJoke();
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  const startEditing = () => {
    setEditedContent(currentText || '');
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
        <View style={[styles.container, { direction: 'rtl' }]}>
          {isEditing && (
            <View style={styles.actions}>
              <View style={styles.actionItem}>
                <IconButton
                  icon="check"
                  onPress={saveChanges}
                />
                <Text variant="labelSmall">{translations.save}</Text>
              </View>
              <View style={styles.actionItem}>
                <IconButton
                  icon="close"
                  onPress={() => setIsEditing(false)}
                />
                <Text variant="labelSmall">{translations.cancel}</Text>
              </View>
            </View>
          )}

          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.jokeContent, animatedStyle]}>
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
                <Text variant="headlineMedium">{currentText}</Text>
              )}
            </Animated.View>
          </GestureDetector>

          {!isEditing && (
            <>
              <View style={styles.versionNavigation}>
                <IconButton
                  icon="chevron-right"
                  onPress={() => setCurrentVersionIndex(prev => Math.max(-1, prev - 1))}
                  disabled={currentVersionIndex === -1}
                />
                <Text variant="bodyMedium">
                  {translations.version} {currentVersionIndex + 2} {translations.of} {totalVersions}
                </Text>
                <IconButton
                  icon="chevron-left"
                  onPress={() => setCurrentVersionIndex(prev => 
                    Math.min(versions.length - 1, prev + 1))}
                  disabled={currentVersionIndex === versions.length - 1}
                />
              </View>

              <View style={styles.viewActions}>
                <View style={styles.actionItem}>
                  <EmojiRating value={joke.rating} onChange={handleRating} />
                  <Text variant="labelSmall">{translations.rate}</Text>
                </View>
                <View style={styles.actionItem}>
                  <IconButton
                    icon="pencil"
                    onPress={startEditing}
                  />
                  <Text variant="labelSmall">{translations.edit}</Text>
                </View>
                <View style={styles.actionItem}>
                  <IconButton
                    icon="plus"
                    onPress={() => router.push({
                      pathname: '/joke/new',
                      params: { jokeId: joke.id, mode: 'new-version' }
                    })}
                  />
                  <Text variant="labelSmall">{translations.newVersion}</Text>
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
                  <Text variant="labelSmall" style={{ color: 'red' }}>{translations.delete}</Text>
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
    direction: 'rtl',
  },
  jokeContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
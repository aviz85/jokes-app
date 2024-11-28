import React, { useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, IconButton, TextInput } from 'react-native-paper';
import { router } from 'expo-router';

const translations = {
  save: 'שמור',
  cancel: 'ביטול',
  placeholder: 'כתוב את הבדיחה כאן...',
};

export default function NewJokeScreen() {
  const [content, setContent] = useState('');

  const saveJoke = () => {
    // TODO: Save new joke to DB
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { direction: 'rtl' }]}>
        <TextInput
          mode="outlined"
          value={content}
          onChangeText={setContent}
          multiline
          style={[styles.editInput, { textAlign: 'right' }]}
          autoFocus
          placeholder={translations.placeholder}
          textAlign="right"
        />
        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <IconButton
              icon="check"
              onPress={saveJoke}
            />
            <Text variant="labelSmall">{translations.save}</Text>
          </View>
          <View style={styles.actionItem}>
            <IconButton
              icon="close"
              onPress={() => router.back()}
            />
            <Text variant="labelSmall">{translations.cancel}</Text>
          </View>
        </View>
      </View>
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
    paddingBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  editInput: {
    width: '100%',
    backgroundColor: 'transparent',
    maxHeight: '80%',
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
  actionItem: {
    alignItems: 'center',
  },
}); 
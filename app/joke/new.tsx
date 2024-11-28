import React, { useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, IconButton, TextInput } from 'react-native-paper';
import { router } from 'expo-router';

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
      <View style={styles.container}>
        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <IconButton
              icon="check"
              onPress={saveJoke}
            />
            <Text variant="labelSmall">Save</Text>
          </View>
          <View style={styles.actionItem}>
            <IconButton
              icon="close"
              onPress={() => router.back()}
            />
            <Text variant="labelSmall">Cancel</Text>
          </View>
        </View>

        <View style={styles.jokeContent}>
          <TextInput
            mode="outlined"
            value={content}
            onChangeText={setContent}
            multiline
            style={styles.editInput}
            autoFocus
            placeholder="Write your joke here..."
          />
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
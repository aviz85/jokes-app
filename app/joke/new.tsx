import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function NewJokeScreen() {
  const [content, setContent] = React.useState('');

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        mode="outlined"
        label="Joke Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button 
        mode="contained" 
        onPress={() => router.back()}
        style={{ marginTop: 16 }}
      >
        Save
      </Button>
    </View>
  );
} 
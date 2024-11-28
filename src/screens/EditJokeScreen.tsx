import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import type { EditJokeScreenProps } from '../types/navigation';

export default function EditJokeScreen({ navigation, route }: EditJokeScreenProps) {
  const [content, setContent] = React.useState(route.params.joke?.versions[0]?.content || '');

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
        onPress={() => navigation.goBack()}
        style={{ marginTop: 16 }}
      >
        Save
      </Button>
    </View>
  );
} 
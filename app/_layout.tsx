import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="joke/[id]"
          options={{ title: 'Joke Details' }}
        />
        <Stack.Screen 
          name="joke/new"
          options={{ title: 'New Joke' }}
        />
      </Stack>
    </PaperProvider>
  );
}

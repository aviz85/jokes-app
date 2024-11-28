import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../src/constants/theme';
import type { Joke } from '../src/types/jokes';
import type { RouteProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

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
          options={({ route }: { route: RouteProp<ParamListBase, string> }) => ({ 
            title: 'joke' in (route.params || {}) ? 'Edit Joke' : 'New Joke'
          })}
        />
      </Stack>
    </PaperProvider>
  );
}

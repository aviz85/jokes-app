import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/constants/theme';
import JokeListScreen from './src/screens/JokeListScreen';
import JokeDetailScreen from './src/screens/JokeDetailScreen';
import EditJokeScreen from './src/screens/EditJokeScreen';
import type { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="JokeList" 
            component={JokeListScreen}
            options={{ title: 'Jokes' }}
          />
          <Stack.Screen 
            name="JokeDetail" 
            component={JokeDetailScreen}
            options={{ title: 'Joke' }}
          />
          <Stack.Screen 
            name="EditJoke" 
            component={EditJokeScreen}
            options={({ route }: { route: RouteProp<RootStackParamList, 'EditJoke'> }) => ({
              title: route.params?.joke ? 'Edit Joke' : 'New Joke'
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 
import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from '../src/constants/theme';
import type { Joke } from '../src/types/jokes';
import type { RouteProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

// Force RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={{
        ...theme,
        isV3: true,
      }}>
        <Stack
          screenOptions={{
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="joke/[id]"
            options={{ title: 'בדיחה' }}
          />
          <Stack.Screen 
            name="joke/new"
            options={({ route }) => ({ 
              title: 'joke' in (route.params || {}) ? 'עריכת בדיחה' : 'בדיחה חדשה'
            })}
          />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

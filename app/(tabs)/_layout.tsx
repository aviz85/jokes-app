import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <PaperProvider theme={theme}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Jokes',
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

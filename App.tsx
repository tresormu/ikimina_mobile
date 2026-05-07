import { enableScreens } from 'react-native-screens';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { GroupProvider } from './src/context/GroupContext';

// Must be called before any navigation renders
enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <GroupProvider>
        <NavigationContainer>
          {/* <StatusBar style="dark" /> */}
          <RootNavigator />
        </NavigationContainer>
      </GroupProvider>
    </SafeAreaProvider>
  );
}

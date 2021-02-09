import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthProvider from './src/contexts/auth'
import Routes from './src/routes/index';

console.disableYellowBox = true;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <AuthProvider>
              <Routes/>
          </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}
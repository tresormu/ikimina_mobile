import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { OnboardingScreen }  from '../screens/onboarding/OnboardingScreen';
import { LoginScreen }       from '../screens/auth/LoginScreen';
import { OTPVerifyScreen }   from '../screens/auth/OTPVerifyScreen';
import { ProfileSetupScreen } from '../screens/auth/ProfileSetupScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding"   component={OnboardingScreen} />
      <Stack.Screen name="Login"        component={LoginScreen} />
      <Stack.Screen name="OTPVerify"    component={OTPVerifyScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </Stack.Navigator>
  );
};

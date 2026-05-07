import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../design/tokens';

// Full-screen screens
import { NotificationsScreen }    from '../screens/main/NotificationsScreen';
import { ContributionFlowScreen } from '../screens/main/ContributionFlowScreen';
import { CreditPassportScreen }   from '../screens/main/CreditPassportScreen';
import { JoinGroupScreen }        from '../screens/main/JoinGroupScreen';
import { LoanVotingScreen }       from '../screens/main/LoanVotingScreen';
import { NotificationSettingsScreen } from '../screens/main/NotificationSettingsScreen';
import { HelpFAQScreen }          from '../screens/main/HelpFAQScreen';

// Modal screens
import { LoanRequestScreen }       from '../screens/modals/LoanRequestScreen';
import { TransactionDetailScreen } from '../screens/modals/TransactionDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={TabNavigator} />
      )}

      {/* Full-screen push screens */}
      <Stack.Screen name="Notifications"         component={NotificationsScreen}         options={{ headerShown: true, title: 'Notifications', headerBackTitle: '' }} />
      <Stack.Screen name="ContributionFlow"      component={ContributionFlowScreen}      options={{ headerShown: true, title: 'Pay Contribution', headerBackTitle: '' }} />
      <Stack.Screen name="CreditPassport"        component={CreditPassportScreen}        options={{ headerShown: true, title: 'Credit Passport', headerBackTitle: '' }} />
      <Stack.Screen name="JoinGroup"             component={JoinGroupScreen}             options={{ headerShown: true, title: 'Join a Group', headerBackTitle: '' }} />
      <Stack.Screen name="LoanVoting"            component={LoanVotingScreen}            options={{ headerShown: true, title: 'Loan Vote', headerBackTitle: '' }} />
      <Stack.Screen name="NotificationSettings"  component={NotificationSettingsScreen}  options={{ headerShown: true, title: 'Notification Settings', headerBackTitle: '' }} />
      <Stack.Screen name="HelpFAQ"               component={HelpFAQScreen}               options={{ headerShown: true, title: 'Help & FAQ', headerBackTitle: '' }} />

      {/* Modal screens */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="LoanRequest"       component={LoanRequestScreen} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

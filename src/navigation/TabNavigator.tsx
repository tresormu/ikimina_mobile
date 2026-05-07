import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight } from '../design/tokens';
import { MainTabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/main/HomeScreen';
import { GroupScreen } from '../screens/main/GroupScreen';
import { LoansScreen } from '../screens/main/LoansScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false as boolean,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
          backgroundColor: colors.surface,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.semibold,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home')    iconName = focused ? 'home'    : 'home-outline';
          if (route.name === 'Group')   iconName = focused ? 'people'  : 'people-outline';
          if (route.name === 'Loans')   iconName = focused ? 'wallet'  : 'wallet-outline';
          if (route.name === 'Profile') iconName = focused ? 'person'  : 'person-outline';
          return <Ionicons name={iconName} size={Number(size)} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"    component={HomeScreen}    options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Group"   component={GroupScreen}   options={{ tabBarLabel: 'Group' }} />
      <Tab.Screen name="Loans"   component={LoansScreen}   options={{ tabBarLabel: 'Loans' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

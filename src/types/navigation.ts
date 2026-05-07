import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  OTPVerify: { phoneNumber: string };
  ProfileSetup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Group: undefined;
  Loans: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Full-screen stack
  Notifications: undefined;
  ContributionFlow: undefined;
  CreditPassport: undefined;
  JoinGroup: undefined;
  LoanVoting: { loanId: string };
  NotificationSettings: undefined;
  HelpFAQ: undefined;
  // Modals
  LoanRequest: undefined;
  TransactionDetail: { id: string };
};

export type AuthNavigationProp    = NativeStackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type RootNavigationProp    = NativeStackNavigationProp<RootStackParamList>;

export type AppNavigationProp = CompositeNavigationProp<
  MainTabNavigationProp,
  NativeStackNavigationProp<RootStackParamList>
>;

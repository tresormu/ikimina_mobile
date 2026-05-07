import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './src/theme/theme';
import { tabs, groupMembers, type TabKey } from './src/content';

// Import Screens
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LedgerScreen } from './src/screens/LedgerScreen';
import { LoanScreen } from './src/screens/LoanScreen';
import { GroupScreen } from './src/screens/GroupScreen';

type RegisterForm = {
  groupName: string;
  treasurer: string;
  members: string;
  contributionAmount: string;
};

const initialForm: RegisterForm = {
  groupName: '',
  treasurer: '',
  members: '',
  contributionAmount: '',
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [hasAccessedGroup, setHasAccessedGroup] = useState(false);
  const [members, setMembers] = useState(groupMembers);
  const [form, setForm] = useState<RegisterForm>(initialForm);

  const headerTitle = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return 'IkiminaPass';
      case 'ledger':
        return 'Group Ledger';
      case 'loans':
        return 'Loan Management';
      case 'group':
        return 'Group Dashboard';
      default:
        return 'IkiminaPass';
    }
  }, [activeTab]);

  const submitRegistration = () => {
    setRegistered(true);
    setShowRegisterForm(false);
    setActiveTab('group');
  };

  const handleAddContribution = (memberName: string, amount: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMembers(prev => [
      {
        name: memberName,
        role: 'Member',
        status: 'paid',
        amount: `RWF ${amount}`,
        time: timeStr
      },
      ...prev
    ]);
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaProvider>
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.appShell}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable style={styles.profileButton}>
                <Ionicons name="person-outline" size={24} color={colors.primary} />
              </Pressable>
              <Pressable style={styles.profileButton} onPress={() => setIsLoggedIn(false)}>
                <Ionicons name="log-out-outline" size={24} color={colors.error} />
              </Pressable>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === 'home' && (
              <HomeScreen
                form={form}
                onChange={setForm}
                onSubmit={submitRegistration}
                registered={registered}
                showRegisterForm={showRegisterForm}
                onToggleRegister={() => setShowRegisterForm((value) => !value)}
              />
            )}
            {activeTab === 'ledger' && <LedgerScreen />}
            {activeTab === 'loans' && <LoanScreen />}
            {activeTab === 'group' && (
              <GroupScreen 
                hasAccessed={hasAccessedGroup || registered} 
                onAccess={() => setHasAccessedGroup(true)}
                members={members}
                onAddContribution={handleAddContribution}
              />
            )}
          </ScrollView>

          <View style={styles.bottomNav}>
            {tabs.map((tab) => {
              const active = tab.key === activeTab;
              let iconName: any = 'home-outline';
              
              if (tab.key === 'home') iconName = active ? 'home' : 'home-outline';
              if (tab.key === 'ledger') iconName = active ? 'list' : 'list-outline';
              if (tab.key === 'loans') iconName = active ? 'cash' : 'cash-outline';
              if (tab.key === 'group') iconName = active ? 'people' : 'people-outline';

              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={styles.navItem}
                >
                  <Ionicons
                    name={iconName}
                    size={22}
                    color={active ? colors.accent : colors.muted}
                  />
                  <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appShell: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  profileButton: {
    padding: 4,
  },
  content: {
    paddingBottom: 100,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingBottom: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.muted,
  },
  navLabelActive: {
    color: colors.accent,
  },
});

export default App;

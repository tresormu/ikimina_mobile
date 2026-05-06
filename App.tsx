import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  groupActivity,
  groupChart,
  groupOverview,
  homeHighlights,
  howItWorksSteps,
  services,
  tabs,
  type TabKey,
} from './src/content';

const colors = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  primary: '#1A1C1E',
  secondary: '#42474E',
  accent: '#0061A4',
  success: '#1E7A53',
  error: '#BA1A1A',
  text: '#1A1C1E',
  muted: '#74777F',
  outline: '#C4C6CF',
  divider: '#E1E2EC',
};

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
  const [form, setForm] = useState<RegisterForm>(initialForm);

  const headerTitle = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return 'IkiminaPass';
      case 'services':
        return 'Our Services';
      case 'group':
        return 'Group Overview';
      default:
        return 'IkiminaPass';
    }
  }, [activeTab]);

  const submitRegistration = () => {
    setRegistered(true);
    setShowRegisterForm(false);
    setActiveTab('group');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
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
          {activeTab === 'services' && <ServicesScreen />}
          {activeTab === 'group' && (
            <GroupScreen 
              hasAccessed={hasAccessedGroup || registered} 
              onAccess={() => setHasAccessedGroup(true)} 
            />
          )}
        </ScrollView>

        <View style={styles.bottomNav}>
          {tabs.map((tab) => {
            const active = tab.key === activeTab;
            let iconName: any = 'home-outline';
            if (tab.key === 'services') iconName = active ? 'apps' : 'apps-outline';
            if (tab.key === 'group') iconName = active ? 'people' : 'people-outline';
            if (tab.key === 'home') iconName = active ? 'home' : 'home-outline';

            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={styles.navItem}
              >
                <Ionicons
                  name={iconName}
                  size={24}
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
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLogin = mode === 'login';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.authContainer}>
        <View style={styles.authHeader}>
          <View style={styles.authLogo}>
            <Ionicons name={isLogin ? "lock-closed" : "person-add"} size={32} color={colors.accent} />
          </View>
          <Text style={styles.authTitle}>{isLogin ? 'Secure Login' : 'Create Account'}</Text>
          <Text style={styles.authSubtitle}>
            {isLogin ? 'Access your IkiminaPass account' : 'Join thousands of saving groups today'}
          </Text>
        </View>

        <View style={styles.authForm}>
          {!isLogin && (
            <InputRow
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="e.g. John Doe"
            />
          )}
          <InputRow
            label="Email or Phone"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          <InputRow
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
          />
          {!isLogin && (
            <InputRow
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
            />
          )}
          
          {isLogin && (
            <Pressable style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Pressable>
          )}

          <Pressable style={styles.primaryButton} onPress={onLogin}>
            <Text style={styles.primaryButtonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
          </Pressable>

          <View style={styles.authFooter}>
            <Text style={styles.authFooterText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <Pressable onPress={() => setMode(isLogin ? 'signup' : 'login')}>
              <Text style={styles.authFooterLink}>
                {isLogin ? 'Create Account' : 'Log In'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({
  form,
  onChange,
  onSubmit,
  registered,
  showRegisterForm,
  onToggleRegister,
}: {
  form: RegisterForm;
  onChange: (value: RegisterForm) => void;
  onSubmit: () => void;
  registered: boolean;
  showRegisterForm: boolean;
  onToggleRegister: () => void;
}) {
  return (
    <View style={styles.screen}>
      <View style={styles.welcomeHero}>
        <Text style={styles.heroTitle}>Welcome to IkiminaPass</Text>
        <Text style={styles.heroSubtitle}>Professional group savings management.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <Pressable 
          style={[styles.actionButton, showRegisterForm && styles.actionButtonActive]} 
          onPress={onToggleRegister}
        >
          <Ionicons name="add-circle-outline" size={24} color={showRegisterForm ? '#FFF' : colors.accent} />
          <Text style={[styles.actionButtonText, showRegisterForm && styles.actionButtonTextActive]}>
            {showRegisterForm ? 'Cancel Registration' : 'Register New Group'}
          </Text>
        </Pressable>
      </View>

      {showRegisterForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Register Your Group</Text>
          <InputRow
            label="Group Name"
            value={form.groupName}
            onChangeText={(value) => onChange({ ...form, groupName: value })}
            placeholder="e.g. Kigali Savings Group"
          />
          <InputRow
            label="Treasurer Name"
            value={form.treasurer}
            onChangeText={(value) => onChange({ ...form, treasurer: value })}
            placeholder="e.g. Jane Mukamana"
          />
          <View style={styles.inputRowGroup}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <InputRow
                label="Members"
                value={form.members}
                onChangeText={(value) => onChange({ ...form, members: value })}
                placeholder="18"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <InputRow
                label="Amount (RWF)"
                value={form.contributionAmount}
                onChangeText={(value) => onChange({ ...form, contributionAmount: value })}
                placeholder="25,000"
              />
            </View>
          </View>

          <Pressable style={styles.primaryButton} onPress={onSubmit}>
            <Text style={styles.primaryButtonText}>Complete Registration</Text>
          </Pressable>
        </View>
      )}

      {registered && !showRegisterForm && (
        <View style={styles.successNotice}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text style={styles.successNoticeText}>Group registered successfully!</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {howItWorksSteps.map((step, index) => (
            <View key={step.title} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDetail}>{step.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Key Highlights</Text>
        {homeHighlights.map((highlight, index) => (
          <View key={index} style={styles.highlightItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.success} />
            <Text style={styles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ServicesScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Professional Services</Text>
        <View style={styles.listContainer}>
          {services.map((service, index) => (
            <View key={service.title} style={[styles.listItem, index === services.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.listItemHeader}>
                <Ionicons name="flash-outline" size={20} color={colors.accent} />
                <Text style={styles.listItemTitle}>{service.title}</Text>
              </View>
              <Text style={styles.listItemDetail}>{service.detail}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function GroupScreen({ 
  hasAccessed, 
  onAccess 
}: { 
  hasAccessed: boolean; 
  onAccess: () => void; 
}) {
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  if (!hasAccessed) {
    return (
      <View style={styles.screen}>
        <View style={styles.welcomeHero}>
          <Text style={styles.heroTitle}>Access Group</Text>
          <Text style={styles.heroSubtitle}>Enter your group details to view records.</Text>
        </View>

        <View style={styles.formContainer}>
          <InputRow
            label="Group Name"
            value={groupName}
            onChangeText={setGroupName}
            placeholder="e.g. Kigali Savings Group"
          />
          <InputRow
            label="Group Access Code"
            value={groupCode}
            onChangeText={setGroupCode}
            placeholder="Enter 6-digit code"
          />
          
          <Pressable style={styles.primaryButton} onPress={onAccess}>
            <Text style={styles.primaryButtonText}>Access Group Dashboard</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Security Note</Text>
          <View style={styles.highlightItem}>
            <Ionicons name="shield-outline" size={20} color={colors.muted} />
            <Text style={styles.highlightText}>Access codes are provided by your group treasurer.</Text>
          </View>
        </View>
      </View>
    );
  }

  const maxAmount = Math.max(...groupChart.map((item) => item.amount));

  return (
    <View style={styles.screen}>
      <View style={styles.balanceBoard}>
        <Text style={styles.balanceLabel}>Current Total Balance</Text>
        <Text style={styles.balanceValue}>{groupOverview.balance}</Text>
        <View style={styles.balanceMetaRow}>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>{groupOverview.members} Members</Text>
          </View>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>{groupOverview.cycle}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Financial Performance</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartBars}>
            {groupChart.map((item) => {
              const height = Math.max(20, Math.round((item.amount / maxAmount) * 120));
              return (
                <View key={item.month} style={styles.chartCol}>
                  <View style={[styles.chartBar, { height }]} />
                  <Text style={styles.chartLabel}>{item.month}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.chartLegend}>
            <Text style={styles.legendText}>Monthly Savings Growth (RWF)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Recent Activity</Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>Next Collection</Text>
            <Text style={styles.listItemDetail}>{groupOverview.nextCollection}</Text>
          </View>
          {groupActivity.map((activity, index) => (
            <View key={index} style={[styles.listItem, index === groupActivity.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.listItemDetail}>{activity}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function InputRow({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

function formatCompactAmount(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  return `${Math.round(value / 1000)}K`;
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
  screen: {
    padding: 20,
    gap: 24,
  },
  welcomeHero: {
    paddingVertical: 10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.muted,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 0, // No circles/rounded
    borderWidth: 1.5,
    borderColor: colors.accent,
    gap: 10,
  },
  actionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.accent,
  },
  actionButtonTextActive: {
    color: '#FFF',
  },
  formContainer: {
    padding: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#FFF',
  },
  inputRowGroup: {
    flexDirection: 'row',
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  successNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    gap: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  successNoticeText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },
  stepsContainer: {
    gap: 0,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  stepItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: '#FFF',
  },
  stepNumber: {
    width: 28,
    height: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  stepDetail: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  highlightText: {
    fontSize: 15,
    color: colors.secondary,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: '#FFF',
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 4,
  },
  listItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  listItemDetail: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  balanceBoard: {
    backgroundColor: colors.primary,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    color: '#ACB1B9',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '800',
  },
  balanceMetaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metaBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  metaBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.divider,
    padding: 20,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingBottom: 10,
  },
  chartCol: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  chartBar: {
    width: '60%',
    backgroundColor: colors.accent,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  chartLegend: {
    marginTop: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 10,
  },
  legendText: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
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
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
  },
  navLabelActive: {
    color: colors.accent,
  },
  // Auth Styles
  authContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  authLogo: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 15,
    color: colors.muted,
  },
  authForm: {
    gap: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
  authFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  authFooterText: {
    fontSize: 14,
    color: colors.muted,
  },
  authFooterLink: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '700',
  },
});

export default App;

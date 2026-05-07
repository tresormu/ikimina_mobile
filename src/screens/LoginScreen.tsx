import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/theme';
import { InputRow } from '../components/InputRow';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
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
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
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

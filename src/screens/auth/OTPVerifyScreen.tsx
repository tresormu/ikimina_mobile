import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native';
import { Layout } from '../../components/shared/Layout';
import { Typography } from '../../components/ui/Typography';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { spacing, colors } from '../../design/tokens';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthNavigationProp, AuthStackParamList } from '../../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { mockUser } from '../../data/mockData';

export const OTPVerifyScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const route = useRoute<RouteProp<AuthStackParamList, 'OTPVerify'>>();
  const { phoneNumber } = route.params;
  const { login } = useAuth();

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (otp.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(mockUser); // sets isAuthenticated = true → RootNavigator shows Main
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.header}>
            <Typography variant="h1" style={styles.title}>Verify it's you</Typography>
            <Typography variant="bodyLarge" color={colors.textSecondary}>
              We sent a 4-digit code to{' '}
              <Typography variant="bodyLarge" color={colors.primary} style={{ fontWeight: '600' }}>
                {phoneNumber}
              </Typography>
            </Typography>
          </View>

          <View style={styles.form}>
            <Input
              label="OTP Code"
              placeholder="0000"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              maxLength={4}
              leftIcon="shield-checkmark-outline"
            />

            <Button
              label="Verify & Continue"
              onPress={handleVerify}
              loading={isLoading}
              disabled={otp.length < 4}
            />

            <View style={styles.resendContainer}>
              <Typography variant="bodySmall">Didn't receive the code? </Typography>
              <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(59)}>
                <Typography
                  variant="bodySmall"
                  color={timer > 0 ? colors.textMuted : colors.primary}
                  style={{ fontWeight: '600' }}
                >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  container: {
    flex: 1,
  },
  header: {
    marginBottom: spacing['4xl'],
  },
  title: {
    marginBottom: spacing.sm,
  },
  form: {
    width: '100%',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
});

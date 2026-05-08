import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Layout } from '../../components/shared/Layout';
import { Typography } from '../../components/ui/Typography';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { spacing, colors } from '../../design/tokens';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../types/navigation';
import { useApp } from '../../context/AppContext';

export const LoginScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { showLoading } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    if (phoneNumber.length < 10) return;
    showLoading(1500);
    // Simulate API call
    setTimeout(() => {
      navigation.navigate('OTPVerify', { phoneNumber });
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.header}>
            <Typography variant="h1" style={styles.title}>Welcome back</Typography>
            <Typography variant="bodyLarge" color={colors.textSecondary}>
              Enter your phone number to sign in to your Ikimina account.
            </Typography>
          </View>

          <View style={styles.form}>
            <Input
              label="Phone Number"
              placeholder="e.g. 078XXXXXXX"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              leftIcon="call-outline"
            />
            
            <Button 
              label="Send OTP" 
              onPress={handleLogin}
              disabled={phoneNumber.length < 10}
            />

            <View style={styles.footer}>
              <Typography variant="bodySmall" align="center">
                By continuing, you agree to our{' '}
                <Typography variant="bodySmall" color={colors.primary} style={{ fontWeight: '600' }}>
                  Terms of Service
                </Typography>{' '}
                and{' '}
                <Typography variant="bodySmall" color={colors.primary} style={{ fontWeight: '600' }}>
                  Privacy Policy
                </Typography>.
              </Typography>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  footer: {
    marginTop: spacing['2xl'],
    paddingHorizontal: spacing.md,
  },
});

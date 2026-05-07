import React, { useState } from 'react';
import {
  View, StyleSheet, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '../../components/shared/Layout';
import { Typography } from '../../components/ui/Typography';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { colors, spacing, radius, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { mockUser } from '../../data/mockData';

export const ProfileSetupScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!fullName.trim() || nationalId.length < 16) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ ...mockUser, fullName: fullName.trim(), nationalId });
    }, 1200);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Avatar placeholder */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => Alert.alert('Photo Upload', 'Photo upload will be available in the next version.')}
            >
              <Ionicons name="person" size={40} color={colors.primary} />
              <View style={styles.cameraBtn}>
                <Ionicons name="camera" size={14} color={palette.white} />
              </View>
            </TouchableOpacity>
            <Typography variant="bodySmall" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
              Tap to add photo (optional)
            </Typography>
          </View>

          <View style={styles.header}>
            <Typography variant="h2" style={{ marginBottom: spacing.sm }}>Complete your profile</Typography>
            <Typography variant="body" color={colors.textSecondary}>
              This information is used to verify your identity within your savings group.
            </Typography>
          </View>

          <Input
            label="Full Name"
            placeholder="e.g. Alice Umutoni"
            value={fullName}
            onChangeText={setFullName}
            leftIcon="person-outline"
            autoCapitalize="words"
          />
          <Input
            label="National ID Number"
            placeholder="16-digit ID number"
            value={nationalId}
            onChangeText={setNationalId}
            leftIcon="card-outline"
            keyboardType="numeric"
            maxLength={16}
          />

          <Button
            label="Complete Setup"
            onPress={handleContinue}
            loading={loading}
            disabled={!fullName.trim() || nationalId.length < 16}
            style={{ marginTop: spacing.sm }}
          />
        </KeyboardAvoidingView>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  avatarSection: { alignItems: 'center', marginBottom: spacing['3xl'] },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.white,
  },
  header: { marginBottom: spacing['2xl'] },
});

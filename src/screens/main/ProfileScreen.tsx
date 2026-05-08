import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { colors, spacing, radius, shadow, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockUser, creditBreakdown } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { useGroup } from '../../context/GroupContext';
import { useTranslation } from '../../hooks/useTranslation';
import { AppNavigationProp } from '../../types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProfileScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  const { groups, activeGroup, switchGroup, leaveGroup } = useGroup();
  const { lang, changeLanguage } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLeaveGroup = () => {
    Alert.alert(
      'Leave Group',
      `Are you sure you want to leave "${activeGroup.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: () => leaveGroup(activeGroup.id) },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: spacing['6xl'] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.xl }]}>
        <TouchableOpacity style={styles.avatarLarge}>
          <Typography variant="h1" color={colors.primary}>{mockUser.fullName[0]}</Typography>
          <View style={styles.cameraBtn}>
            <Ionicons name="camera" size={12} color={palette.white} />
          </View>
        </TouchableOpacity>
        <Typography variant="h2" style={{ marginTop: spacing.md }}>{mockUser.fullName}</Typography>
        <Typography variant="body" color={colors.textSecondary}>{mockUser.phone}</Typography>
        <View style={styles.joinBadge}>
          <Typography variant="caption" color={colors.textMuted}>Member since {mockUser.joinDate}</Typography>
        </View>
      </View>

      {/* Credit Score Card */}
      <View style={styles.section}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('CreditPassport')}
          style={styles.creditCard}
        >
          <View style={styles.creditLeft}>
            <Typography variant="caption" color={colors.textSecondary} style={{ marginBottom: 2 }}>Credit Score</Typography>
            <Typography variant="h2" color={colors.primary}>{mockUser.creditScore}</Typography>
            <View style={[styles.categoryBadge, { backgroundColor: colors.successLight }]}>
              <Typography variant="caption" color={colors.success} style={{ fontWeight: '700' }}>
                {mockUser.creditCategory}
              </Typography>
            </View>
          </View>
          <View style={styles.creditRight}>
            <View style={styles.scoreRing}>
              <Typography variant="h3" color={palette.white}>{Math.round((mockUser.creditScore / 850) * 100)}%</Typography>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={{ marginTop: spacing.sm }} />
          </View>
        </TouchableOpacity>
      </View>

      {/* My Groups */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3">My Groups</Typography>
          <TouchableOpacity onPress={() => navigation.navigate('JoinGroup')}>
            <Typography variant="bodySmall" color={colors.primary} style={{ fontWeight: '600' }}>+ Join Group</Typography>
          </TouchableOpacity>
        </View>
        <Card variant="outline" padding="md">
          {groups.map((g, i) => (
            <TouchableOpacity
              key={g.id}
              style={[styles.groupRow, i < groups.length - 1 ? styles.groupRowBorder : null]}
              onPress={() => switchGroup(g.id)}
            >
              <View style={[styles.groupDot, { backgroundColor: g.id === activeGroup.id ? colors.primary : colors.border }]} />
              <View style={{ flex: 1 }}>
                <Typography variant="body" style={{ fontWeight: g.id === activeGroup.id ? '700' : '400' }}>{g.name}</Typography>
                <Typography variant="caption" color={colors.textMuted}>{g.totalMembers} members · {g.frequency}</Typography>
              </View>
              {g.id === activeGroup.id && (
                <View style={styles.activeBadge}>
                  <Typography variant="caption" color={colors.primary} style={{ fontWeight: '700' }}>ACTIVE</Typography>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Card>
      </View>

      {/* Language */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>Language</Typography>
        <Card variant="outline" padding="md">
          <View style={styles.langRow}>
            {(['en', 'rw'] as const).map((l) => (
              <TouchableOpacity
                key={l}
                style={[styles.langBtn, lang === l ? styles.langBtnActive : null]}
                onPress={() => changeLanguage(l)}
              >
                <Typography
                  variant="body"
                  color={lang === l ? palette.white : colors.textSecondary}
                  style={{ fontWeight: '600' }}
                >
                  {l === 'en' ? '🇬🇧 English' : '🇷🇼 Kinyarwanda'}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>Settings</Typography>
        <Card variant="outline" padding="md">
          <SettingRow
            icon="notifications-outline"
            label="Push Notifications"
            right={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ true: colors.primary, false: colors.border }}
                thumbColor={palette.white}
              />
            }
          />
          <SettingRow
            icon="options-outline"
            label="Notification Preferences"
            onPress={() => navigation.navigate('NotificationSettings')}
          />
          <SettingRow
            icon="lock-closed-outline"
            label="Change PIN"
            onPress={() => Alert.alert('Change PIN', 'PIN change will be available in the next version.')}
          />
          <SettingRow
            icon="call-outline"
            label="Change Phone Number"
            onPress={() => Alert.alert('Change Phone', 'You will receive an OTP to verify your new number.')}
          />
          <SettingRow
            icon="shield-checkmark-outline"
            label="Privacy & Security"
            onPress={() => Alert.alert('Privacy', 'All your data is encrypted and never shared without your consent.')}
            isLast
          />
        </Card>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>Support</Typography>
        <Card variant="outline" padding="md">
          <SettingRow
            icon="help-circle-outline"
            label="Help & FAQ"
            onPress={() => navigation.navigate('HelpFAQ')}
          />
          <SettingRow
            icon="chatbubble-outline"
            label="Contact Support"
            onPress={() => Alert.alert('Support', 'Email: support@ikiminapass.com\nPhone: +250 788 000 000')}
          />
          <SettingRow
            icon="document-text-outline"
            label="Terms of Service"
            onPress={() => Alert.alert('Terms', 'Terms of Service v1.0 — IkiminaPass 2026')}
            isLast
          />
        </Card>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Card variant="outline" padding="md">
          <SettingRow
            icon="exit-outline"
            label="Leave Current Group"
            onPress={handleLeaveGroup}
            danger
          />
          <SettingRow
            icon="person-remove-outline"
            label="Deactivate Account"
            onPress={() => Alert.alert('Deactivate', 'Please contact support to deactivate your account.')}
            danger
            isLast
          />
        </Card>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <Button
          label="Log Out"
          variant="outline"
          onPress={handleLogout}
          icon="log-out-outline"
          style={{ borderColor: colors.danger }}
          labelStyle={{ color: colors.danger }}
        />
        <Typography variant="caption" align="center" color={colors.textMuted} style={{ marginTop: spacing.md }}>
          IkiminaPass v1.0.0
        </Typography>
      </View>
    </ScrollView>
  );
};

const SettingRow = ({
  icon, label, right, onPress, isLast, danger,
}: {
  icon: string; label: string; right?: React.ReactNode;
  onPress?: () => void; isLast?: boolean; danger?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.settingRow, !isLast ? styles.settingBorder : null]}
    onPress={onPress}
    disabled={!onPress && !right}
    activeOpacity={0.7}
  >
    <Ionicons name={icon as any} size={22} color={danger ? colors.danger : colors.textSecondary} />
    <Typography
      variant="body"
      color={danger ? colors.danger : colors.textPrimary}
      style={{ flex: 1, marginLeft: spacing.md }}
    >
      {label}
    </Typography>
    {right ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={colors.textMuted} /> : null)}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingBottom: spacing['2xl'],
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarLarge: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    ...shadow.sm,
  },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: palette.white,
  },
  joinBadge: {
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.md, paddingVertical: 2,
    borderRadius: radius.full,
  },
  section: { paddingHorizontal: spacing.xl, marginTop: spacing['2xl'] },
  sectionTitle: { marginBottom: spacing.md },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.md,
  },
  creditCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sm,
  },
  creditLeft: { flex: 1 },
  creditRight: { alignItems: 'center' },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: radius.sm, marginTop: spacing.xs,
  },
  scoreRing: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  groupRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: spacing.md,
  },
  groupRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  groupDot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.md },
  activeBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: radius.sm,
  },
  langRow: { flexDirection: 'row', gap: spacing.sm },
  langBtn: {
    flex: 1, paddingVertical: spacing.md,
    borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  langBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  settingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: spacing.md,
  },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
});

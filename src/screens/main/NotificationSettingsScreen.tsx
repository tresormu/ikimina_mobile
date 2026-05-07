import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { colors, spacing } from '../../design/tokens';

const SETTINGS = [
  { key: 'contribution_reminder',  label: 'Contribution Reminders',    desc: 'Remind me before the weekly deadline' },
  { key: 'contribution_confirmed', label: 'Payment Confirmed',          desc: 'Notify when my payment is verified' },
  { key: 'contribution_missed',    label: 'Missed Payment Alerts',      desc: 'Alert me if I miss a contribution' },
  { key: 'your_turn',              label: 'My Payout Notification',     desc: 'Notify when it\'s my turn to receive' },
  { key: 'loan_vote',              label: 'Loan Vote Requests',         desc: 'Notify when a member requests a loan' },
  { key: 'loan_approved',          label: 'Loan Approved / Declined',   desc: 'Status updates on my loan requests' },
  { key: 'credit_updated',         label: 'Credit Score Updates',       desc: 'Notify when my score changes' },
  { key: 'new_member',             label: 'New Member Joined',          desc: 'Notify when someone joins my group' },
  { key: 'announcement',           label: 'Group Announcements',        desc: 'Messages from the treasurer' },
];

export const NotificationSettingsScreen = () => {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(SETTINGS.map((s) => [s.key, true]))
  );

  const toggle = (key: string) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Typography variant="body" color={colors.textSecondary} style={{ marginBottom: spacing.xl }}>
        Choose which notifications you want to receive.
      </Typography>

      <Card variant="outline" padding="md">
        {SETTINGS.map((item, i) => (
          <View key={item.key} style={[styles.row, i < SETTINGS.length - 1 && styles.rowBorder]}>
            <View style={{ flex: 1, marginRight: spacing.md }}>
              <Typography variant="body" style={{ fontWeight: '600' }}>{item.label}</Typography>
              <Typography variant="caption" color={colors.textMuted}>{item.desc}</Typography>
            </View>
            <Switch
              value={prefs[item.key]}
              onValueChange={() => toggle(item.key)}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor={colors.surface}
            />
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: spacing.xl, paddingBottom: spacing['6xl'] },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
});

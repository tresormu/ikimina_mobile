import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockGroups } from '../../data/mockData';

type Step = 'enter' | 'preview' | 'success';

const GROUP_TYPE_LABEL: Record<string, string> = {
  ROTATING_EQUAL:     'Classic Rotating (ROSCA)',
  ACCUMULATING_SHARES:'Accumulating Shares (ASCA)',
  ROTATING_AUCTION:   'Auction Rotation',
  SOLIDARITY_FUND:    'Solidarity Fund',
  INVESTMENT_CLUB:    'Investment Club',
  HYBRID:             'Hybrid',
};

export const JoinGroupScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState<Step>('enter');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundGroup, setFoundGroup] = useState<typeof mockGroups[0] | null>(null);

  const handleSearch = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const group = mockGroups.find((g) => g.inviteCode === code.trim());
      if (group) {
        setFoundGroup(group);
        setStep('preview');
      } else {
        setError('No group found with this invite code. Please check and try again.');
      }
    }, 1000);
  };

  const handleConfirmJoin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1200);
  };

  if (step === 'success') {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={72} color={colors.success} />
        </View>
        <Typography variant="h2" align="center" style={{ marginBottom: spacing.md }}>
          You've joined!
        </Typography>
        <Typography variant="body" align="center" color={colors.textSecondary} style={{ marginBottom: spacing['3xl'] }}>
          Welcome to {foundGroup?.name}. Your first contribution is due on {foundGroup?.nextCollectionDate}.
        </Typography>
        <Button label="Go to Dashboard" onPress={() => navigation.goBack()} style={{ width: '100%' }} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {step === 'enter' && (
        <>
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <Ionicons name="people" size={40} color={colors.primary} />
            </View>
            <Typography variant="h3" align="center" style={{ marginBottom: spacing.sm }}>
              Enter Invite Code
            </Typography>
            <Typography variant="body" align="center" color={colors.textSecondary}>
              Ask your group treasurer for the 6-digit invite code.
            </Typography>
          </View>

          <Input
            label="Group Invite Code"
            placeholder="e.g. 284712"
            value={code}
            onChangeText={(v) => { setCode(v); setError(''); }}
            leftIcon="key-outline"
            keyboardType="numeric"
            maxLength={6}
            error={error}
          />

          <Button
            label="Find Group"
            onPress={handleSearch}
            loading={loading}
            disabled={code.length < 6}
            icon="search-outline"
          />
        </>
      )}

      {step === 'preview' && foundGroup && (
        <>
          <Typography variant="h3" style={{ marginBottom: spacing.xl }}>Group Preview</Typography>

          {/* Group Card */}
          <Card variant="elevated" padding="xl" style={styles.groupCard}>
            <View style={styles.groupHeader}>
              <View style={styles.groupAvatar}>
                <Typography variant="h2" color={colors.primary}>{foundGroup.name[0]}</Typography>
              </View>
              <View style={{ flex: 1 }}>
                <Typography variant="h3">{foundGroup.name}</Typography>
                <Typography variant="bodySmall" color={colors.textSecondary}>
                  {GROUP_TYPE_LABEL[foundGroup.groupType]}
                </Typography>
              </View>
            </View>

            <View style={styles.statsRow}>
              <StatItem label="Members"    value={`${foundGroup.totalMembers}`} />
              <StatItem label="Frequency"  value={foundGroup.frequency} />
              <StatItem label="Cycle"      value={`#${foundGroup.currentCycle}`} />
            </View>

            {foundGroup.contributionAmount && (
              <View style={styles.amountRow}>
                <Typography variant="body" color={colors.textSecondary}>Contribution per period</Typography>
                <Typography variant="h3" color={colors.primary}>
                  RWF {foundGroup.contributionAmount.toLocaleString()}
                </Typography>
              </View>
            )}
          </Card>

          {/* Rules */}
          {foundGroup.rules.length > 0 && (
            <Card variant="flat" padding="lg" style={{ marginTop: spacing.lg }}>
              <Typography variant="label" style={{ marginBottom: spacing.md }}>Group Rules</Typography>
              {foundGroup.rules.map((rule, i) => (
                <View key={i} style={styles.ruleItem}>
                  <Ionicons name="checkmark-circle-outline" size={18} color={colors.primary} />
                  <Typography variant="bodySmall" style={{ flex: 1, marginLeft: spacing.sm }}>{rule}</Typography>
                </View>
              ))}
            </Card>
          )}

          <View style={styles.actions}>
            <Button label="Confirm & Join" onPress={handleConfirmJoin} loading={loading} />
            <Button label="Go Back" variant="ghost" onPress={() => setStep('enter')} style={{ marginTop: spacing.sm }} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statItem}>
    <Typography variant="h3" color={colors.primary}>{value}</Typography>
    <Typography variant="caption">{label}</Typography>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: spacing.xl, paddingBottom: spacing['6xl'] },
  hero: { alignItems: 'center', marginBottom: spacing['3xl'] },
  heroIcon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  groupCard: { marginBottom: spacing.lg },
  groupHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  groupAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  statItem: { alignItems: 'center' },
  amountRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  ruleItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm },
  actions: { marginTop: spacing['2xl'] },
  successContainer: {
    flex: 1, backgroundColor: colors.bg,
    alignItems: 'center', justifyContent: 'center',
    padding: spacing['3xl'],
  },
  successIcon: { marginBottom: spacing['2xl'] },
});

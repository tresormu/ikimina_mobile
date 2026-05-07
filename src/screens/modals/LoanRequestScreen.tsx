import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';

const LOAN_PURPOSES = [
  'School fees',
  'Medical expenses',
  'Business expansion',
  'Home improvement',
  'Emergency',
  'Other',
];

export const LoanRequestScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!amount || (!selectedPurpose && !purpose)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={64} color={colors.success} />
        </View>
        <Typography variant="h2" align="center" style={{ marginBottom: spacing.md }}>
          Request Submitted!
        </Typography>
        <Typography variant="body" align="center" color={colors.textSecondary} style={{ marginBottom: spacing['3xl'] }}>
          Your loan request of RWF {parseInt(amount).toLocaleString()} has been sent to the group for voting. You'll be notified once a decision is made.
        </Typography>
        <Button label="Done" onPress={() => navigation.goBack()} style={{ width: '100%' }} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Typography variant="h3">Request a Loan</Typography>
          <View style={{ width: 40 }} />
        </View>

        {/* Info Banner */}
        <Card variant="flat" style={styles.infoBanner}>
          <Ionicons name="information-circle" size={20} color={colors.info} />
          <Typography variant="bodySmall" color={colors.textSecondary} style={{ flex: 1, marginLeft: spacing.sm }}>
            Loans require approval from at least 14 of 18 group members. Interest rate: 5% per month.
          </Typography>
        </Card>

        {/* Amount */}
        <Input
          label="Loan Amount (RWF)"
          placeholder="e.g. 100000"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          leftIcon="cash-outline"
          containerStyle={{ marginBottom: spacing.xl }}
        />

        {/* Purpose Quick Select */}
        <Typography variant="label" style={{ marginBottom: spacing.sm }}>
          Purpose
        </Typography>
        <View style={styles.purposeGrid}>
          {LOAN_PURPOSES.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.purposeChip, selectedPurpose === p ? styles.purposeChipActive : null]}
              onPress={() => setSelectedPurpose(p)}
            >
              <Typography
                variant="bodySmall"
                color={selectedPurpose === p ? colors.textInverse : colors.textSecondary}
                style={{ fontWeight: '600' }}
              >
                {p}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>

        {selectedPurpose === 'Other' && (
          <Input
            label="Describe your purpose"
            placeholder="Tell the group why you need this loan..."
            value={purpose}
            onChangeText={setPurpose}
            multiline
            numberOfLines={3}
            containerStyle={{ marginTop: spacing.lg }}
          />
        )}

        {/* Summary */}
        {amount !== '' && (
          <Card variant="outline" style={styles.summary}>
            <View style={styles.summaryRow}>
              <Typography variant="bodySmall" color={colors.textSecondary}>Principal</Typography>
              <Typography variant="body" style={{ fontWeight: '700' }}>
                RWF {parseInt(amount || '0').toLocaleString()}
              </Typography>
            </View>
            <View style={styles.summaryRow}>
              <Typography variant="bodySmall" color={colors.textSecondary}>Monthly Interest (5%)</Typography>
              <Typography variant="body" style={{ fontWeight: '700' }}>
                RWF {(parseInt(amount || '0') * 0.05).toLocaleString()}
              </Typography>
            </View>
            <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm }]}>
              <Typography variant="body" style={{ fontWeight: '700' }}>Total (3 months)</Typography>
              <Typography variant="body" color={colors.primary} style={{ fontWeight: '800' }}>
                RWF {(parseInt(amount || '0') * 1.15).toLocaleString()}
              </Typography>
            </View>
          </Card>
        )}

        <Button
          label="Submit Loan Request"
          onPress={handleSubmit}
          loading={loading}
          disabled={!amount || (!selectedPurpose && !purpose)}
          style={{ marginTop: spacing.xl }}
          icon="send-outline"
          iconPosition="right"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: spacing['6xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing['2xl'],
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: radius.md,
  },
  purposeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  purposeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  purposeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  summary: {
    padding: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  successContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['3xl'],
  },
  successIcon: {
    marginBottom: spacing['2xl'],
  },
});

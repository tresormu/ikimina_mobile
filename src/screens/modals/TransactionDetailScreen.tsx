import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockContributions } from '../../data/mockData';
import { RootStackParamList } from '../../types/navigation';

type RouteProps = RouteProp<RootStackParamList, 'TransactionDetail'>;

const STATUS_CONFIG = {
  paid:    { color: colors.success, bg: colors.successLight, icon: 'checkmark-circle' as const,  label: 'Confirmed' },
  pending: { color: colors.warning, bg: colors.warningLight, icon: 'time' as const,               label: 'Pending' },
  missed:  { color: colors.danger,  bg: colors.dangerLight,  icon: 'close-circle' as const,       label: 'Missed' },
  partial: { color: colors.warning, bg: colors.warningLight, icon: 'alert-circle' as const,       label: 'Partial' },
};

const METHOD_LABEL: Record<string, string> = {
  mobile_money:  'Mobile Money (MoMo)',
  bank_transfer: 'Bank Transfer',
  cash:          'Cash',
};

export const TransactionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();
  const tx = mockContributions.find((c) => c.id === route.params.id);

  if (!tx) {
    return (
      <View style={styles.center}>
        <Typography variant="body" color={colors.textMuted}>Transaction not found.</Typography>
      </View>
    );
  }

  const cfg = STATUS_CONFIG[tx.status] ?? STATUS_CONFIG.pending;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Typography variant="h3">Transaction Detail</Typography>
          <View style={{ width: 40 }} />
        </View>

        {/* Status Hero */}
        <View style={[styles.statusHero, { backgroundColor: cfg.bg }]}>
          <Ionicons name={cfg.icon} size={56} color={cfg.color} />
          <Typography variant="h2" color={cfg.color} style={{ marginTop: spacing.md }}>
            {cfg.label}
          </Typography>
          <Typography variant="h1" style={{ marginTop: spacing.sm }}>
            RWF {tx.amount.toLocaleString()}
          </Typography>
          <Typography variant="bodySmall" color={colors.textSecondary} style={{ marginTop: spacing.xs }}>
            Cycle {tx.cycleNumber} — Week {tx.weekNumber}
          </Typography>
        </View>

        {/* Details Card */}
        <Card variant="elevated" style={styles.detailsCard}>
          <DetailRow label="Status"         value={cfg.label}                                  valueColor={cfg.color} />
          <DetailRow label="Amount"         value={`RWF ${tx.amount.toLocaleString()}`} />
          <DetailRow label="Cycle / Week"   value={`Cycle ${tx.cycleNumber}, Week ${tx.weekNumber}`} />
          <DetailRow label="Submitted"      value={tx.submittedAt} />
          {tx.confirmedAt && (
            <DetailRow label="Confirmed"    value={tx.confirmedAt} />
          )}
          {tx.paymentMethod && (
            <DetailRow label="Method"       value={METHOD_LABEL[tx.paymentMethod] ?? tx.paymentMethod} />
          )}
          {tx.transactionId && (
            <DetailRow label="Transaction ID" value={tx.transactionId} isLast />
          )}
        </Card>

        {/* Help note for missed */}
        {tx.status === 'missed' && (
          <Card variant="flat" style={styles.alertCard}>
            <Ionicons name="alert-circle" size={20} color={colors.danger} />
            <Typography variant="bodySmall" color={colors.danger} style={{ flex: 1, marginLeft: spacing.sm }}>
              This missed payment has been recorded and may affect your credit score. Contact your treasurer if this is an error.
            </Typography>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const DetailRow = ({
  label, value, valueColor, isLast,
}: { label: string; value: string; valueColor?: string; isLast?: boolean }) => (
  <View style={[styles.detailRow, !isLast && styles.detailBorder]}>
    <Typography variant="bodySmall" color={colors.textSecondary}>{label}</Typography>
    <Typography variant="body" color={valueColor ?? colors.textPrimary} style={{ fontWeight: '600', maxWidth: '60%', textAlign: 'right' }}>
      {value}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: spacing['6xl'],
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  statusHero: {
    alignItems: 'center',
    padding: spacing['3xl'],
    borderRadius: radius.xl,
    marginBottom: spacing['2xl'],
  },
  detailsCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  detailBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.dangerLight,
  },
});

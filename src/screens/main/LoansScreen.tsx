import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { colors, spacing, radius, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockLoans } from '../../data/mockData';
import { AppNavigationProp } from '../../types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LoansScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const insets = useSafeAreaInsets();
  const activeLoan  = mockLoans.find((l) => l.status === 'active');
  const pendingVotes = mockLoans.filter((l) => l.status === 'pending' && l.requesterName);

  const paid     = activeLoan ? activeLoan.amount - (activeLoan.remainingBalance ?? 0) : 0;
  const progress = activeLoan ? paid / activeLoan.amount : 0;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: spacing['6xl'] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Typography variant="h2">Loans</Typography>
        <Typography variant="body" color={colors.textSecondary}>Manage your loans and vote on requests.</Typography>
      </View>

      {/* Active Loan */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>My Active Loan</Typography>
        {activeLoan ? (
          <Card variant="elevated" style={styles.activeLoanCard} padding="xl">
            {/* Header */}
            <View style={styles.loanHeader}>
              <View>
                <Typography variant="label" color={palette.orange200}>Remaining Balance</Typography>
                <Typography variant="h2" color={palette.white}>
                  RWF {(activeLoan.remainingBalance ?? 0).toLocaleString()}
                </Typography>
              </View>
              <View style={styles.activeBadge}>
                <Typography variant="caption" color={colors.success} style={{ fontWeight: '700' }}>ACTIVE</Typography>
              </View>
            </View>

            {/* Progress */}
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
              </View>
              <View style={styles.progressLabels}>
                <Typography variant="caption" color={palette.orange200}>
                  Paid: RWF {paid.toLocaleString()}
                </Typography>
                <Typography variant="caption" color={palette.orange200}>
                  Total: RWF {activeLoan.amount.toLocaleString()}
                </Typography>
              </View>
            </View>

            {/* Details */}
            <View style={styles.loanMeta}>
              <View>
                <Typography variant="caption" color={palette.orange200}>Due Date</Typography>
                <Typography variant="body" color={palette.white} style={{ fontWeight: '600' }}>
                  {activeLoan.dueDate ?? '—'}
                </Typography>
              </View>
              <View>
                <Typography variant="caption" color={palette.orange200}>Interest</Typography>
                <Typography variant="body" color={palette.white} style={{ fontWeight: '600' }}>
                  {activeLoan.interestRate}% / mo
                </Typography>
              </View>
              <View>
                <Typography variant="caption" color={palette.orange200}>Votes</Typography>
                <Typography variant="body" color={palette.white} style={{ fontWeight: '600' }}>
                  {activeLoan.votesFor}/{activeLoan.totalVotes}
                </Typography>
              </View>
            </View>

            <TouchableOpacity style={styles.repayBtn}>
              <Typography variant="body" color={colors.primary} style={{ fontWeight: '700' }}>
                Repay Loan
              </Typography>
            </TouchableOpacity>
          </Card>
        ) : (
          <Card variant="outline" style={styles.noLoanCard} padding="2xl">
            <Ionicons name="cash-outline" size={48} color={colors.textMuted} />
            <Typography variant="h3" align="center" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>
              No active loans
            </Typography>
            <Typography variant="body" align="center" color={colors.textSecondary}>
              You don't have any active loans with the group.
            </Typography>
          </Card>
        )}
      </View>

      {/* Repayment Schedule */}
      {activeLoan?.repaymentSchedule && (
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Repayment Schedule</Typography>
          <Card variant="outline" padding="md">
            {activeLoan.repaymentSchedule.map((entry, i) => (
              <View
                key={i}
                style={[styles.scheduleRow, i < activeLoan.repaymentSchedule!.length - 1 && styles.scheduleBorder]}
              >
                <View style={[styles.scheduleIcon, { backgroundColor: entry.paid ? colors.successLight : colors.warningLight }]}>
                  <Ionicons
                    name={entry.paid ? 'checkmark-circle' : 'time'}
                    size={18}
                    color={entry.paid ? colors.success : colors.warning}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Typography variant="body" style={{ fontWeight: '600' }}>
                    RWF {entry.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color={colors.textMuted}>{entry.date}</Typography>
                </View>
                <View style={[styles.scheduleBadge, { backgroundColor: entry.paid ? colors.successLight : colors.warningLight }]}>
                  <Typography variant="caption" color={entry.paid ? colors.success : colors.warning} style={{ fontWeight: '700' }}>
                    {entry.paid ? 'PAID' : 'DUE'}
                  </Typography>
                </View>
              </View>
            ))}
          </Card>
        </View>
      )}

      {/* Pending Loan Votes */}
      {pendingVotes.length > 0 && (
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Pending Loan Votes</Typography>
          {pendingVotes.map((loan) => (
            <Card key={loan.id} variant="outline" padding="lg" style={styles.voteCard}>
              <View style={styles.voteHeader}>
                <View style={styles.voteAvatar}>
                  <Typography variant="body" color={colors.primary} style={{ fontWeight: '700' }}>
                    {(loan.requesterName ?? 'M')[0]}
                  </Typography>
                </View>
                <View style={{ flex: 1 }}>
                  <Typography variant="body" style={{ fontWeight: '600' }}>{loan.requesterName}</Typography>
                  <Typography variant="caption" color={colors.textMuted}>
                    Requesting RWF {loan.amount.toLocaleString()}
                  </Typography>
                </View>
                <View style={styles.pendingBadge}>
                  <Typography variant="caption" color={colors.warning} style={{ fontWeight: '700' }}>VOTE</Typography>
                </View>
              </View>

              {/* Vote progress */}
              <View style={styles.voteProgress}>
                <View style={styles.voteTrack}>
                  <View style={[styles.voteFill, { width: `${(loan.votesFor / loan.totalVotes) * 100}%` }]} />
                </View>
                <Typography variant="caption" color={colors.textSecondary} style={{ marginTop: 4 }}>
                  {loan.votesFor} of {Math.ceil(loan.totalVotes * 0.75)} votes needed
                </Typography>
              </View>

              <Button
                label="Cast Your Vote"
                size="sm"
                onPress={() => navigation.navigate('LoanVoting', { loanId: loan.id })}
                icon="hand-left-outline"
                style={{ marginTop: spacing.md }}
              />
            </Card>
          ))}
        </View>
      )}

      {/* Eligibility */}
      <View style={styles.section}>
        <Typography variant="h3" style={styles.sectionTitle}>Loan Eligibility</Typography>
        <Card variant="flat" padding="lg">
          {[
            { icon: 'checkmark-circle', color: colors.success, text: 'Member for 6+ months ✓' },
            { icon: 'checkmark-circle', color: colors.success, text: 'Good payment history ✓' },
            { icon: 'information-circle', color: colors.info,  text: 'Maximum loan: RWF 500,000' },
          ].map((item, i) => (
            <View key={i} style={[styles.eligibilityItem, i < 2 && styles.eligibilityBorder]}>
              <Ionicons name={item.icon as any} size={22} color={item.color} />
              <Typography variant="body" style={{ marginLeft: spacing.md }}>{item.text}</Typography>
            </View>
          ))}
        </Card>
      </View>

      {/* CTA */}
      <View style={styles.section}>
        <Button
          label="Request New Loan"
          onPress={() => navigation.navigate('LoanRequest')}
          icon="add-circle-outline"
        />
        <Typography variant="caption" align="center" style={{ marginTop: spacing.md }} color={colors.textMuted}>
          Requires 75% group approval (14/18 votes)
        </Typography>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing['2xl'] },
  sectionTitle: { marginBottom: spacing.md },
  activeLoanCard: { backgroundColor: colors.primary, borderRadius: radius['2xl'] },
  loanHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.xl },
  activeBadge: { backgroundColor: palette.white, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm },
  progressContainer: { marginBottom: spacing.xl },
  progressTrack: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginBottom: spacing.sm, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: palette.white, borderRadius: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  loanMeta: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingTop: spacing.lg, borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)', marginBottom: spacing.xl,
  },
  repayBtn: {
    backgroundColor: palette.white, height: 48,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  noLoanCard: { alignItems: 'center' },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  scheduleBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  scheduleIcon: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  scheduleBadge: {
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: radius.sm,
  },
  voteCard: { marginBottom: spacing.md },
  voteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  voteAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  pendingBadge: {
    backgroundColor: colors.warningLight,
    paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm,
  },
  voteProgress: { marginBottom: spacing.xs },
  voteTrack: { height: 6, backgroundColor: colors.surfaceAlt, borderRadius: 3, overflow: 'hidden' },
  voteFill: { height: '100%', backgroundColor: colors.success, borderRadius: 3 },
  eligibilityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  eligibilityBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
});

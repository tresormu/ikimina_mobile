import React, { useState } from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockLoans } from '../../data/mockData';
import { RootStackParamList } from '../../types/navigation';

type RouteProps = RouteProp<RootStackParamList, 'LoanVoting'>;

export const LoanVotingScreen = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const loan = mockLoans.find((l) => l.id === route.params.loanId) ?? mockLoans[1];

  const [voted, setVoted] = useState<'approve' | 'decline' | null>(null);
  const [loading, setLoading] = useState(false);

  const votesNeeded = Math.ceil(loan.totalVotes * 0.75); // 75% majority
  const progress = loan.votesFor / loan.totalVotes;

  const handleVote = (choice: 'approve' | 'decline') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVoted(choice);
    }, 1000);
  };

  if (voted) {
    return (
      <View style={styles.resultContainer}>
        <View style={[styles.resultIcon, { backgroundColor: voted === 'approve' ? colors.successLight : colors.dangerLight }]}>
          <Ionicons
            name={voted === 'approve' ? 'checkmark-circle' : 'close-circle'}
            size={64}
            color={voted === 'approve' ? colors.success : colors.danger}
          />
        </View>
        <Typography variant="h2" align="center" style={{ marginBottom: spacing.md }}>
          Vote Submitted
        </Typography>
        <Typography variant="body" align="center" color={colors.textSecondary} style={{ marginBottom: spacing['3xl'] }}>
          You voted to {voted === 'approve' ? 'approve' : 'decline'} this loan request.
          The group will be notified once all votes are in.
        </Typography>
        <Button label="Back" onPress={() => navigation.goBack()} style={{ width: '100%' }} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Requester */}
      <Card variant="elevated" padding="xl" style={styles.requesterCard}>
        <View style={styles.requesterRow}>
          <View style={styles.avatar}>
            <Typography variant="h3" color={colors.primary}>
              {(loan.requesterName ?? 'M')[0]}
            </Typography>
          </View>
          <View style={{ flex: 1 }}>
            <Typography variant="h3">{loan.requesterName ?? 'Group Member'}</Typography>
            <Typography variant="bodySmall" color={colors.textSecondary}>{loan.requesterPhone ?? ''}</Typography>
          </View>
          <View style={styles.pendingBadge}>
            <Typography variant="caption" color={colors.warning} style={{ fontWeight: '700' }}>PENDING</Typography>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Typography variant="body" color={colors.textSecondary}>Requested Amount</Typography>
          <Typography variant="h3" color={colors.primary}>RWF {loan.amount.toLocaleString()}</Typography>
        </View>
        <View style={styles.detailRow}>
          <Typography variant="body" color={colors.textSecondary}>Interest Rate</Typography>
          <Typography variant="body" style={{ fontWeight: '600' }}>{loan.interestRate}% / month</Typography>
        </View>
        <View style={[styles.detailRow, { marginBottom: 0 }]}>
          <Typography variant="body" color={colors.textSecondary}>Reason</Typography>
          <Typography variant="body" style={{ fontWeight: '600', maxWidth: '55%', textAlign: 'right' }}>
            {loan.reason}
          </Typography>
        </View>
      </Card>

      {/* Vote Progress */}
      <Card variant="flat" padding="lg" style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Typography variant="body" style={{ fontWeight: '600' }}>Current Votes</Typography>
          <Typography variant="bodySmall" color={colors.textSecondary}>
            {loan.votesFor} of {votesNeeded} needed
          </Typography>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
          <View style={[styles.thresholdLine, { left: `${(votesNeeded / loan.totalVotes) * 100}%` }]} />
        </View>
        <View style={styles.voteStats}>
          <View style={styles.voteStat}>
            <Ionicons name="thumbs-up" size={18} color={colors.success} />
            <Typography variant="body" color={colors.success} style={{ fontWeight: '700', marginLeft: 6 }}>
              {loan.votesFor} For
            </Typography>
          </View>
          <View style={styles.voteStat}>
            <Ionicons name="thumbs-down" size={18} color={colors.danger} />
            <Typography variant="body" color={colors.danger} style={{ fontWeight: '700', marginLeft: 6 }}>
              {loan.votesAgainst} Against
            </Typography>
          </View>
          <Typography variant="bodySmall" color={colors.textMuted}>
            {loan.totalVotes - loan.votesFor - loan.votesAgainst} pending
          </Typography>
        </View>
      </Card>

      {/* Eligibility note */}
      <Card variant="flat" padding="md" style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color={colors.info} />
        <Typography variant="bodySmall" color={colors.textSecondary} style={{ flex: 1, marginLeft: spacing.sm }}>
          This member has been in the group for 14 months with a 92% on-time payment rate.
        </Typography>
      </Card>

      {/* Vote Buttons */}
      <View style={styles.voteButtons}>
        <Button
          label="Approve Loan"
          onPress={() => handleVote('approve')}
          loading={loading}
          icon="thumbs-up-outline"
          style={[styles.voteBtn, { backgroundColor: colors.success }]}
        />
        <Button
          label="Decline"
          onPress={() => handleVote('decline')}
          variant="outline"
          icon="thumbs-down-outline"
          style={[styles.voteBtn, { borderColor: colors.danger }]}
          labelStyle={{ color: colors.danger }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: spacing.xl, paddingBottom: spacing['6xl'] },
  requesterCard: { marginBottom: spacing.lg },
  requesterRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  pendingBadge: {
    backgroundColor: colors.warningLight,
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: radius.sm,
  },
  divider: { height: 1, backgroundColor: colors.border, marginBottom: spacing.lg },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.md,
  },
  progressCard: { marginBottom: spacing.lg },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.md,
  },
  progressTrack: {
    height: 10, backgroundColor: colors.surfaceAlt,
    borderRadius: 5, overflow: 'visible',
    marginBottom: spacing.md, position: 'relative',
  },
  progressFill: {
    height: '100%', backgroundColor: colors.success,
    borderRadius: 5,
  },
  thresholdLine: {
    position: 'absolute', top: -4, width: 2,
    height: 18, backgroundColor: colors.warning,
  },
  voteStats: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  voteStat: { flexDirection: 'row', alignItems: 'center' },
  infoCard: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.xl },
  voteButtons: { gap: spacing.md },
  voteBtn: { width: '100%' },
  resultContainer: {
    flex: 1, backgroundColor: colors.bg,
    alignItems: 'center', justifyContent: 'center',
    padding: spacing['3xl'],
  },
  resultIcon: {
    width: 120, height: 120, borderRadius: 60,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing['2xl'],
  },
});

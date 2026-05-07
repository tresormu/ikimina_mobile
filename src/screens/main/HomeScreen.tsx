import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { colors, spacing, radius, shadow, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockUser, mockContributions } from '../../data/mockData';
import { useGroup } from '../../context/GroupContext';
import { useTranslation } from '../../hooks/useTranslation';
import { AppNavigationProp } from '../../types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const insets = useSafeAreaInsets();
  const { activeGroup: group, groups, switchGroup } = useGroup();
  const { t } = useTranslation();
  const [switcherVisible, setSwitcherVisible] = React.useState(false);

  const weeksUntilMyTurn = group.myPosition - group.currentWeek;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing['4xl'] }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
          <TouchableOpacity style={styles.groupSelector} onPress={() => setSwitcherVisible(true)}>
            <Typography variant="bodySmall" color={colors.textSecondary}>Current Group</Typography>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="h3" numberOfLines={1} style={{ maxWidth: 200 }}>{group.name}</Typography>
              <Ionicons name="chevron-down" size={18} color={colors.textSecondary} style={{ marginLeft: 4 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationBtn} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* ── Main Card ── */}
        <View style={styles.section}>
          <Card variant="elevated" style={styles.mainCard} padding="xl">
            <View style={styles.mainCardHeader}>
              <Typography variant="label" color={palette.orange200}>{t('nextContribution')}</Typography>
              <Typography variant="bodySmall" color={palette.orange200}>{group.nextCollectionDate}</Typography>
            </View>
            <Typography variant="h1" color={palette.white} style={styles.mainAmount}>
              RWF {(group.contributionAmount ?? 0).toLocaleString()}
            </Typography>
            <View style={styles.mainCardFooter}>
              <View style={styles.statItem}>
                <Typography variant="caption" color={palette.orange200}>{t('thisWeekRecipient')}</Typography>
                <Typography variant="body" color={palette.white} style={{ fontWeight: '600' }} numberOfLines={1}>
                  {group.recipientName ?? '—'}
                </Typography>
              </View>
              <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('ContributionFlow')}>
                <Typography variant="bodySmall" color={colors.primary} style={{ fontWeight: '700' }}>
                  {t('payNow')}
                </Typography>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* ── My Turn Banner ── */}
        {weeksUntilMyTurn > 0 && (
          <View style={styles.section}>
            <View style={styles.turnBanner}>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <Typography variant="bodySmall" style={{ marginLeft: spacing.sm, flex: 1 }}>
                {t('myTurn')}{' '}
                <Typography variant="bodySmall" color={colors.primary} style={{ fontWeight: '700' }}>
                  {weeksUntilMyTurn} {t('weeks')}
                </Typography>
                {' '}· Pot: RWF {(group.potAmount ?? 0).toLocaleString()}
              </Typography>
            </View>
          </View>
        )}

        {/* ── Quick Actions ── */}
        <View style={styles.quickActions}>
          <ActionIcon icon="wallet"      label={t('loans')}   onPress={() => navigation.navigate('Main', { screen: 'Loans' })}   color="#F59E0B" />
          <ActionIcon icon="people"      label={t('group')}   onPress={() => navigation.navigate('Main', { screen: 'Group' })}   color="#6366F1" />
          <ActionIcon icon="stats-chart" label={t('score')}   onPress={() => navigation.navigate('CreditPassport')}              color="#10B981" />
          <ActionIcon icon="receipt"     label={t('history')} onPress={() => navigation.navigate('Main', { screen: 'Group' })}   color="#EC4899" />
        </View>

        {/* ── Credit Score ── */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Your Credit Health</Typography>
          <Card variant="outline" onPress={() => navigation.navigate('CreditPassport')} style={styles.scoreCard} padding="lg">
            <View style={styles.scoreInfo}>
              <Typography variant="h2" color={colors.primary}>{mockUser.creditScore}</Typography>
              <Typography variant="bodySmall" color={colors.textSecondary}>Rating: {mockUser.creditCategory}</Typography>
              <View style={styles.scoreBarContainer}>
                <View style={[styles.scoreBar, { width: `${(mockUser.creditScore / 850) * 100}%` }]} />
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Card>
        </View>

        {/* ── Group Overview ── */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Group Overview</Typography>
          <Card variant="flat" padding="lg">
            <View style={styles.groupRow}>
              <GroupStat label="Members"      value={`${group.totalMembers}`} />
              <View style={styles.groupDivider} />
              <GroupStat label="Current Week" value={`Wk ${group.currentWeek}`} />
              <View style={styles.groupDivider} />
              <GroupStat label="My Position"  value={`#${group.myPosition}`} />
            </View>
          </Card>
        </View>

        {/* ── Recent Activity ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">{t('recentActivity')}</Typography>
            <TouchableOpacity onPress={() => navigation.navigate('ContributionFlow')}>
              <Typography variant="bodySmall" color={colors.primary}>View all</Typography>
            </TouchableOpacity>
          </View>
          {mockContributions.slice(0, 3).map((item, index) => (
            <ActivityItem
              key={item.id}
              item={item}
              isLast={index === 2}
              onPress={() => navigation.navigate('TransactionDetail', { id: item.id })}
            />
          ))}
        </View>
      </ScrollView>

      {/* ── Group Switcher Modal ── */}
      <Modal visible={switcherVisible} transparent animationType="slide" onRequestClose={() => setSwitcherVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setSwitcherVisible(false)}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Typography variant="h3">Switch Group</Typography>
              <TouchableOpacity onPress={() => setSwitcherVisible(false)}>
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            {groups.map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[styles.groupItem, g.id === group.id && styles.groupItemActive]}
                onPress={() => { switchGroup(g.id); setSwitcherVisible(false); }}
              >
                <View style={[styles.groupItemIcon, { backgroundColor: g.id === group.id ? colors.primaryLight : colors.surfaceAlt }]}>
                  <Ionicons
                    name={g.groupType === 'ACCUMULATING_SHARES' ? 'stats-chart' : 'people'}
                    size={20}
                    color={g.id === group.id ? colors.primary : colors.textSecondary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Typography variant="body" style={{ fontWeight: '600' }}>{g.name}</Typography>
                  <Typography variant="caption" color={colors.textMuted}>
                    {g.totalMembers} members · {g.frequency}
                  </Typography>
                </View>
                {g.id === group.id && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            <Button
              label="Join New Group"
              variant="outline"
              onPress={() => { setSwitcherVisible(false); navigation.navigate('JoinGroup'); }}
              style={{ marginTop: spacing.lg }}
              icon="add-circle-outline"
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const ActionIcon = ({ icon, label, onPress, color }: { icon: string; label: string; onPress: () => void; color: string }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={[styles.actionIcon, { backgroundColor: color + '18' }]}>
      <Ionicons name={icon as any} size={24} color={color} />
    </View>
    <Typography variant="caption" style={{ marginTop: 6 }}>{label}</Typography>
  </TouchableOpacity>
);

const GroupStat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.groupStat}>
    <Typography variant="h3" color={colors.primary}>{value}</Typography>
    <Typography variant="caption">{label}</Typography>
  </View>
);

const ActivityItem = ({ item, isLast, onPress }: { item: typeof mockContributions[0]; isLast: boolean; onPress: () => void }) => (
  <TouchableOpacity style={[styles.activityItem, !isLast && styles.activityBorder]} onPress={onPress} activeOpacity={0.7}>
    <View style={[styles.activityIcon, {
      backgroundColor: item.status === 'paid' ? colors.successLight : item.status === 'missed' ? colors.dangerLight : colors.warningLight,
    }]}>
      <Ionicons
        name={item.status === 'paid' ? 'checkmark-circle' : item.status === 'missed' ? 'close-circle' : 'time'}
        size={20}
        color={item.status === 'paid' ? colors.success : item.status === 'missed' ? colors.danger : colors.warning}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Typography variant="body" style={{ fontWeight: '500' }}>Contribution — Week {item.weekNumber}</Typography>
      <Typography variant="caption">{item.submittedAt}</Typography>
    </View>
    <Typography variant="body" style={{ fontWeight: '600' }}>RWF {item.amount.toLocaleString()}</Typography>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: spacing.xl, marginBottom: spacing.xl,
  },
  groupSelector: { flex: 1 },
  notificationBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    ...shadow.sm,
  },
  badge: {
    position: 'absolute', top: 10, right: 10,
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: colors.danger, borderWidth: 2, borderColor: colors.surface,
  },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing['2xl'] },
  sectionTitle: { marginBottom: spacing.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  mainCard: { backgroundColor: colors.primary, borderRadius: radius['2xl'] },
  mainCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  mainAmount: { fontSize: 32, marginBottom: spacing.xl },
  mainCardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)',
  },
  statItem: { flex: 1 },
  payBtn: { backgroundColor: palette.white, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.md },
  turnBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.primaryLight, padding: spacing.md, borderRadius: radius.lg,
  },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.xl, marginBottom: spacing['2xl'] },
  actionItem: { alignItems: 'center' },
  actionIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  scoreCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scoreInfo: { flex: 1, marginRight: spacing.xl },
  scoreBarContainer: { height: 6, backgroundColor: colors.surfaceAlt, borderRadius: 3, marginTop: spacing.sm, overflow: 'hidden' },
  scoreBar: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  groupRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  groupStat: { alignItems: 'center', flex: 1 },
  groupDivider: { width: 1, height: 40, backgroundColor: colors.border },
  activityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  activityIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: palette.white, borderTopLeftRadius: radius['2xl'], borderTopRightRadius: radius['2xl'],
    padding: spacing.xl, paddingBottom: spacing['4xl'],
  },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.lg },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  groupItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: spacing.md, borderRadius: radius.lg, marginBottom: spacing.sm,
  },
  groupItemActive: { backgroundColor: colors.primaryLight + '30', borderWidth: 1, borderColor: colors.primaryMid },
  groupItemIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
});

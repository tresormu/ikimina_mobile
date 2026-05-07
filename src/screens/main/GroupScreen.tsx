import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius, shadow, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockMembers, rotationSchedule } from '../../data/mockData';
import { useGroup } from '../../context/GroupContext';
import { AppNavigationProp } from '../../types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Tab = 'members' | 'rotation' | 'rules';

export const GroupScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const insets = useSafeAreaInsets();
  const { activeGroup, groups, switchGroup } = useGroup();
  const [activeTab, setActiveTab] = useState<Tab>('members');
  const [showSwitcher, setShowSwitcher] = useState(false);

  const paid    = mockMembers.filter((m) => m.status === 'paid').length;
  const pending = mockMembers.filter((m) => m.status === 'pending').length;
  const missed  = mockMembers.filter((m) => m.status === 'missed').length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.groupSwitcher} onPress={() => setShowSwitcher(!showSwitcher)}>
            <Typography variant="h3" numberOfLines={1}>{activeGroup.name}</Typography>
            <Ionicons name={showSwitcher ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textSecondary} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
          <Typography variant="caption" color={colors.textMuted}>
            Cycle {activeGroup.currentCycle} · Week {activeGroup.currentWeek}
          </Typography>
        </View>
        <TouchableOpacity
          style={styles.joinBtn}
          onPress={() => navigation.navigate('JoinGroup')}
        >
          <Ionicons name="add" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Group Switcher Dropdown */}
      {showSwitcher && (
        <View style={styles.switcherDropdown}>
          {groups.map((g) => (
            <TouchableOpacity
              key={g.id}
              style={[styles.switcherItem, g.id === activeGroup.id && styles.switcherItemActive]}
              onPress={() => { switchGroup(g.id); setShowSwitcher(false); }}
            >
              <View style={[styles.switcherDot, { backgroundColor: g.id === activeGroup.id ? colors.primary : colors.border }]} />
              <View style={{ flex: 1 }}>
                <Typography variant="body" style={{ fontWeight: g.id === activeGroup.id ? '700' : '400' }}>{g.name}</Typography>
                <Typography variant="caption" color={colors.textMuted}>{g.totalMembers} members</Typography>
              </View>
              {g.id === activeGroup.id && <Ionicons name="checkmark" size={18} color={colors.primary} />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatCard label="Total Balance" value={`RWF ${(activeGroup.totalBalance / 1000000).toFixed(1)}M`} color={colors.primary} />
        <StatCard label="Paid"    value={`${paid}`}    color={colors.success} />
        <StatCard label="Pending" value={`${pending}`} color={colors.warning} />
        <StatCard label="Missed"  value={`${missed}`}  color={colors.danger} />
      </View>

      {/* This week's recipient */}
      {activeGroup.recipientName && (
        <View style={styles.recipientBanner}>
          <Ionicons name="gift-outline" size={18} color={colors.primary} />
          <Typography variant="bodySmall" style={{ marginLeft: spacing.sm, flex: 1 }}>
            This week's recipient:{' '}
            <Typography variant="bodySmall" color={colors.primary} style={{ fontWeight: '700' }}>
              {activeGroup.recipientName}
            </Typography>
            {activeGroup.recipientPhone ? ` · ${activeGroup.recipientPhone}` : ''}
          </Typography>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['members', 'rotation', 'rules'] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Typography
              variant="bodySmall"
              color={activeTab === tab ? colors.primary : colors.textSecondary}
              style={{ fontWeight: activeTab === tab ? '700' : '400', textTransform: 'capitalize' }}
            >
              {tab}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === 'members' && (
        <FlatList
          data={mockMembers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemberItem member={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'rotation' && (
        <FlatList
          data={rotationSchedule}
          keyExtractor={(item) => item.week.toString()}
          renderItem={({ item }) => <RotationItem item={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'rules' && (
        <FlatList
          data={activeGroup.rules}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <View style={[styles.ruleItem, index < activeGroup.rules.length - 1 && styles.ruleBorder]}>
              <View style={styles.ruleNumber}>
                <Typography variant="caption" color={palette.white} style={{ fontWeight: '700' }}>{index + 1}</Typography>
              </View>
              <Typography variant="body" style={{ flex: 1 }}>{item}</Typography>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const StatCard = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <View style={styles.statCard}>
    <Typography variant="h3" color={color}>{value}</Typography>
    <Typography variant="caption">{label}</Typography>
  </View>
);

const MemberItem = ({ member }: { member: typeof mockMembers[0] }) => {
  const statusColor = member.status === 'paid' ? colors.success : member.status === 'missed' ? colors.danger : colors.warning;
  const statusBg    = member.status === 'paid' ? colors.successLight : member.status === 'missed' ? colors.dangerLight : colors.warningLight;
  return (
    <View style={[styles.listItem, member.isMe && styles.highlightItem]}>
      <View style={styles.avatar}>
        <Typography variant="body" color={colors.primary} style={{ fontWeight: '700' }}>{member.name[0]}</Typography>
      </View>
      <View style={{ flex: 1 }}>
        <Typography variant="body" style={{ fontWeight: '600' }}>
          {member.name}{member.isMe ? ' (You)' : ''}
        </Typography>
        <Typography variant="caption" color={colors.textMuted}>{member.phone}</Typography>
      </View>
      <View>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <Typography variant="caption" color={statusColor} style={{ fontWeight: '700' }}>
            {member.status.toUpperCase()}
          </Typography>
        </View>
        {member.paidAt && (
          <Typography variant="caption" color={colors.textMuted} style={{ textAlign: 'right', marginTop: 2 }}>
            {member.paidAt}
          </Typography>
        )}
      </View>
    </View>
  );
};

const RotationItem = ({ item }: { item: typeof rotationSchedule[0] }) => (
  <View style={[styles.listItem, item.isMe && styles.highlightItem]}>
    <View style={[styles.weekBadge, { backgroundColor: item.received ? colors.successLight : item.isMe ? colors.primaryLight : colors.surfaceAlt }]}>
      <Typography variant="caption" color={item.received ? colors.success : item.isMe ? colors.primary : colors.textMuted} style={{ fontWeight: '700' }}>
        W{item.week}
      </Typography>
    </View>
    <View style={{ flex: 1 }}>
      <Typography variant="body" style={{ fontWeight: item.isMe ? '700' : '500' }}>
        {item.member}{item.isMe ? ' 👈 You' : ''}
      </Typography>
      <Typography variant="caption" color={colors.textMuted}>
        Payout: RWF {item.amount.toLocaleString()}
      </Typography>
    </View>
    {item.received ? (
      <View style={styles.receivedBadge}>
        <Ionicons name="checkmark-done" size={14} color={colors.success} />
        <Typography variant="caption" color={colors.success} style={{ marginLeft: 4, fontWeight: '700' }}>PAID</Typography>
      </View>
    ) : (
      <Typography variant="caption" color={item.isMe ? colors.primary : colors.textMuted} style={{ fontWeight: item.isMe ? '700' : '400' }}>
        {item.isMe ? 'YOUR TURN' : 'UPCOMING'}
      </Typography>
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  groupSwitcher: { flexDirection: 'row', alignItems: 'center' },
  joinBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  switcherDropdown: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadow.md,
  },
  switcherItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
  },
  switcherItemActive: { backgroundColor: colors.primaryLight + '30' },
  switcherDot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.md },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statCard: { flex: 1, alignItems: 'center' },
  recipientBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: spacing.md,
    marginRight: spacing['2xl'],
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: colors.primary },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing['6xl'] },
  listItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  highlightItem: { backgroundColor: colors.primaryLight + '25' },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: radius.sm, alignSelf: 'flex-end',
  },
  weekBadge: {
    width: 42, height: 42, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md,
  },
  receivedBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    borderRadius: radius.sm,
  },
  ruleItem: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  ruleBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  ruleNumber: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.md, marginTop: 2,
  },
});

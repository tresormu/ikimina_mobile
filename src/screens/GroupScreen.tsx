import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../theme/theme';
import { InputRow } from '../components/InputRow';
import { 
  groupOverview, 
  groupChart, 
  groupActivity,
  type ContributionStatus
} from '../content';

interface GroupMember {
  name: string;
  role: string;
  status: string;
  amount: string;
  time: string;
}

interface GroupScreenProps {
  hasAccessed: boolean;
  onAccess: () => void;
  members: GroupMember[];
  onAddContribution: (name: string, amount: string) => void;
}

export const GroupScreen: React.FC<GroupScreenProps> = ({ 
  hasAccessed, 
  onAccess,
  members,
  onAddContribution
}) => {
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  
  // Contribution Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [amount, setAmount] = useState('25,000');

  const handlePressAdd = () => {
    if (memberName && amount) {
      onAddContribution(memberName, amount);
      setMemberName('');
      setShowAddForm(false);
    }
  };

  if (!hasAccessed) {
    return (
      <View style={globalStyles.screen}>
        <View style={globalStyles.welcomeHero}>
          <Text style={globalStyles.heroTitle}>Access Group</Text>
          <Text style={globalStyles.heroSubtitle}>Enter your group details to view records.</Text>
        </View>

        <View style={globalStyles.formContainer}>
          <InputRow
            label="Group Name"
            value={groupName}
            onChangeText={setGroupName}
            placeholder="e.g. Kigali Savings Group"
          />
          <InputRow
            label="Group Access Code"
            value={groupCode}
            onChangeText={setGroupCode}
            placeholder="Enter 6-digit code"
          />
          
          <Pressable style={globalStyles.primaryButton} onPress={onAccess}>
            <Text style={globalStyles.primaryButtonText}>Access Group Dashboard</Text>
          </Pressable>
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionHeader}>Security Note</Text>
          <View style={globalStyles.highlightItem}>
            <Ionicons name="shield-outline" size={20} color={colors.muted} />
            <Text style={globalStyles.highlightText}>Access codes are provided by your group treasurer.</Text>
          </View>
        </View>
      </View>
    );
  }

  const maxAmount = Math.max(...groupChart.map((item) => item.amount));

  return (
    <View style={globalStyles.screen}>
      <View style={styles.balanceBoard}>
        <Text style={styles.balanceLabel}>Current Total Balance</Text>
        <Text style={styles.balanceValue}>{groupOverview.balance}</Text>
        <View style={styles.balanceMetaRow}>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>{groupOverview.members} Members</Text>
          </View>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>{groupOverview.cycle}</Text>
          </View>
        </View>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Financial Performance</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartBars}>
            {groupChart.map((item) => {
              const height = Math.max(20, Math.round((item.amount / maxAmount) * 120));
              return (
                <View key={item.month} style={styles.chartCol}>
                  <View style={[styles.chartBar, { height }]} />
                  <Text style={styles.chartLabel}>{item.month}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.chartLegend}>
            <Text style={styles.legendText}>Monthly Savings Growth (RWF)</Text>
          </View>
        </View>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Actions</Text>
        <Pressable 
          style={[styles.addContributionBtn, showAddForm && styles.addContributionBtnActive]} 
          onPress={() => setShowAddForm(!showAddForm)}
        >
          <Ionicons name={showAddForm ? "close" : "add-circle"} size={20} color={showAddForm ? colors.error : colors.accent} />
          <Text style={[styles.addContributionBtnText, showAddForm && { color: colors.error }]}>
            {showAddForm ? "Cancel Entry" : "Add Member Contribution"}
          </Text>
        </Pressable>

        {showAddForm && (
          <View style={globalStyles.formContainer}>
            <InputRow
              label="Member Name"
              value={memberName}
              onChangeText={setMemberName}
              placeholder="e.g. Jean Pierre"
            />
            <InputRow
              label="Contribution Amount (RWF)"
              value={amount}
              onChangeText={setAmount}
              placeholder="25,000"
            />
            <Pressable style={globalStyles.primaryButton} onPress={handlePressAdd}>
              <Text style={globalStyles.primaryButtonText}>Confirm & Add to List</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Recent Activity</Text>
        <View style={globalStyles.listContainer}>
          <View style={globalStyles.listItem}>
            <Text style={styles.listItemTitle}>Next Collection</Text>
            <Text style={styles.listItemDetail}>{groupOverview.nextCollection}</Text>
          </View>
          {groupActivity.map((activity, index) => (
            <View key={index} style={[globalStyles.listItem, index === groupActivity.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.listItemDetail}>{activity}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Member Contributions</Text>
        <View style={globalStyles.listContainer}>
          {members.map((member, index) => {
            const isPaid = member.status === 'paid';
            const isOverdue = member.status === 'overdue';
            
            return (
              <View key={index} style={[styles.memberRow, index === members.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={styles.roleTag}>
                    <Text style={styles.roleTagText}>{member.role}</Text>
                  </View>
                </View>
                
                <View style={styles.contributionStatus}>
                  <View style={[
                    styles.statusIndicator, 
                    isPaid ? styles.statusPaid : (isOverdue ? styles.statusOverdue : styles.statusPending)
                  ]}>
                    <Ionicons 
                      name={isPaid ? "checkmark-circle" : (isOverdue ? "alert-circle" : "time-outline")} 
                      size={14} 
                      color={isPaid ? colors.success : (isOverdue ? colors.error : colors.muted)} 
                    />
                    <Text style={[
                      styles.statusText,
                      isPaid ? { color: colors.success } : (isOverdue ? { color: colors.error } : { color: colors.muted })
                    ]}>
                      {member.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.memberAmount}>
                  <Text style={styles.amountText}>{member.amount}</Text>
                  <Text style={styles.timeText}>{member.time}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceBoard: {
    backgroundColor: colors.primary,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    color: '#ACB1B9',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '800',
  },
  balanceMetaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  metaBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  metaBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.divider,
    padding: 20,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingBottom: 10,
  },
  chartCol: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  chartBar: {
    width: '60%',
    backgroundColor: colors.accent,
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.muted,
  },
  chartLegend: {
    marginTop: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 10,
  },
  legendText: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
  },
  addContributionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: '#FFF',
    gap: 8,
  },
  addContributionBtnActive: {
    borderColor: colors.error,
  },
  addContributionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  listItemDetail: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 12,
  },
  memberInfo: {
    flex: 2,
    gap: 4,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  roleTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.soft,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  roleTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
  },
  contributionStatus: {
    flex: 1.5,
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  statusPaid: {
    backgroundColor: '#E8F5E9',
    borderColor: colors.success,
  },
  statusPending: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFB300',
  },
  statusOverdue: {
    backgroundColor: '#FFEBEE',
    borderColor: colors.error,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  memberAmount: {
    flex: 1.5,
    alignItems: 'flex-end',
    gap: 2,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  timeText: {
    fontSize: 11,
    color: colors.muted,
  },
});

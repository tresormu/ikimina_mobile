import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Layout } from '../../components/shared/Layout';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockContributions } from '../../data/mockData';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../types/navigation';

export const ContributionsScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();

  const renderItem = ({ item }: { item: typeof mockContributions[0] }) => (
    <Card 
      variant="outline" 
      style={styles.itemCard} 
      onPress={() => navigation.navigate('TransactionDetail', { id: item.id })}
    >
      <View style={styles.itemHeader}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
          <Typography variant="caption" color={getStatusColor(item.status)} style={{fontWeight: '700'}}>
            {item.status.toUpperCase()}
          </Typography>
        </View>
        <Typography variant="bodySmall" color={colors.textSecondary}>Cycle {item.cycleNumber}, Week {item.weekNumber}</Typography>
      </View>
      
      <View style={styles.itemBody}>
        <View>
          <Typography variant="h3">RWF {item.amount.toLocaleString()}</Typography>
          <Typography variant="caption" color={colors.textMuted}>{item.submittedAt}</Typography>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
    </Card>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'pending': return colors.warning;
      case 'missed': return colors.danger;
      default: return colors.textMuted;
    }
  };

  return (
    <Layout padding={false}>
      <View style={styles.header}>
        <Typography variant="h1">Contributions</Typography>
        <Typography variant="body" color={colors.textSecondary}>View and manage your payment history.</Typography>
      </View>

      <FlatList
        data={mockContributions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={colors.textMuted} />
            <Typography variant="body" color={colors.textMuted} style={{marginTop: 16}}>No contributions yet.</Typography>
          </View>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    marginBottom: spacing.xl,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  itemCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  itemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});

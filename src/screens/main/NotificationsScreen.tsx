import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Layout } from '../../components/shared/Layout';
import { Typography } from '../../components/ui/Typography';
import { colors, spacing, radius } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockNotifications } from '../../data/mockData';

export const NotificationsScreen = () => {
  return (
    <Layout padding={false}>
      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Typography variant="bodySmall" color={colors.textSecondary}>
              Stay updated with your group activities.
            </Typography>
          </View>
        }
      />
    </Layout>
  );
};

const NotificationItem = ({ item }: { item: typeof mockNotifications[0] }) => (
  <TouchableOpacity style={[styles.item, !item.isRead && styles.unreadItem]}>
    <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) + '15' }]}>
      <Ionicons name={getIcon(item.type) as any} size={22} color={getIconColor(item.type)} />
    </View>
    <View style={{flex: 1}}>
      <View style={styles.itemHeader}>
        <Typography variant="body" style={{fontWeight: '600'}} numberOfLines={1}>{item.title}</Typography>
        <Typography variant="caption" color={colors.textMuted}>{getTimeAgo(item.createdAt)}</Typography>
      </View>
      <Typography variant="bodySmall" color={colors.textSecondary} numberOfLines={2}>{item.message}</Typography>
    </View>
    {!item.isRead && <View style={styles.unreadDot} />}
  </TouchableOpacity>
);

const getIcon = (type: string) => {
  switch (type) {
    case 'contribution_reminder': return 'time-outline';
    case 'contribution_confirmed': return 'checkmark-circle-outline';
    case 'loan_approved': return 'star-outline';
    case 'your_turn': return 'megaphone-outline';
    case 'contribution_missed': return 'alert-circle-outline';
    default: return 'notifications-outline';
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'contribution_reminder': return colors.warning;
    case 'contribution_confirmed': return colors.success;
    case 'loan_approved': return colors.primary;
    case 'your_turn': return colors.info;
    case 'contribution_missed': return colors.danger;
    default: return colors.textSecondary;
  }
};

const getTimeAgo = (dateStr: string) => {
  return '2h ago'; // Simplified for mock
};

const styles = StyleSheet.create({
  listHeader: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listContent: {
    paddingBottom: spacing['4xl'],
  },
  item: {
    flexDirection: 'row',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'flex-start',
  },
  unreadItem: {
    backgroundColor: colors.primaryLight + '20',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
    marginTop: 6,
  },
});

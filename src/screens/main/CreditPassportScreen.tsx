import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Share, Alert } from 'react-native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { colors, spacing, radius, shadow, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { mockUser, creditBreakdown } from '../../data/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CreditPassportScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'score' | 'history' | 'share'>('score');

  const handleShareLink = async () => {
    try {
      await Share.share({
        message: `Check my Ikimina Credit Passport: https://ikiminapass.com/verify/${mockUser.id}?token=abc123xyz (Valid for 24h)`,
      });
    } catch {
      Alert.alert('Error sharing link');
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: spacing['6xl'] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Score Hero */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.xl }]}>
        <View style={styles.scoreBadge}>
          <Typography variant="h1" color={colors.primary}>{mockUser.creditScore}</Typography>
          <Typography variant="body" style={{ fontWeight: '700' }}>{mockUser.creditCategory}</Typography>
        </View>
        <Typography variant="bodySmall" color={colors.textSecondary} align="center" style={{ marginTop: spacing.sm }}>
          Your score increased by 12 points since last month 🎉
        </Typography>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['score', 'history', 'share'] as const).map((tab) => (
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

      <View style={styles.content}>
        {/* ── Score Tab ── */}
        {activeTab === 'score' && (
          <>
            <Typography variant="h3" style={styles.sectionTitle}>Score Breakdown</Typography>
            <Card variant="flat" padding="xl" style={styles.breakdownCard}>
              {creditBreakdown.map((item, index) => (
                <View key={index} style={styles.breakdownItem}>
                  <View style={styles.itemHeader}>
                    <Typography variant="bodySmall" style={{ fontWeight: '500' }}>{item.label}</Typography>
                    <Typography variant="bodySmall" color={colors.textSecondary}>{item.value}/{item.max}</Typography>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${(item.value / item.max) * 100}%`, backgroundColor: item.color }]} />
                  </View>
                </View>
              ))}
            </Card>

            <Typography variant="h3" style={[styles.sectionTitle, { marginTop: spacing['2xl'] }]}>How to improve</Typography>
            <Card variant="outline" padding="lg">
              <TipItem icon="time-outline"    text="Maintain a 100% on-time contribution rate for the next 3 months." />
              <TipItem icon="people-outline"  text="Encourage your group members to maintain high collective health." />
              <TipItem icon="wallet-outline"  text="Repay your active loan ahead of the scheduled due date." isLast />
            </Card>
          </>
        )}

        {/* ── History Tab ── */}
        {activeTab === 'history' && (
          <>
            <Typography variant="h3" style={styles.sectionTitle}>6-Month Trend</Typography>
            <Card variant="flat" padding="xl" style={styles.graphCard}>
              <View style={styles.graphContainer}>
                {[680, 695, 710, 705, 730, 742].map((val, i) => (
                  <View key={i} style={styles.graphColumn}>
                    <Typography variant="caption" color={colors.textSecondary} style={{ marginBottom: 4 }}>{val}</Typography>
                    <View
                      style={[
                        styles.graphBar,
                        { height: (val / 850) * 140, backgroundColor: i === 5 ? colors.primary : colors.primaryLight },
                      ]}
                    />
                    <Typography variant="caption" color={colors.textMuted} style={{ marginTop: 8 }}>
                      {['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'][i]}
                    </Typography>
                  </View>
                ))}
              </View>
            </Card>
          </>
        )}

        {/* ── Share Tab ── */}
        {activeTab === 'share' && (
          <>
            <Typography variant="h3" style={styles.sectionTitle}>Share Credit Passport</Typography>
            <Typography variant="bodySmall" color={colors.textSecondary} style={{ marginBottom: spacing.xl }}>
              Generate a secure link to share your credit history with lenders or partners.
            </Typography>

            <Card variant="outline" padding="xl" style={styles.shareCard}>
              <Ionicons name="link-outline" size={32} color={colors.primary} style={{ marginBottom: 12 }} />
              <Typography variant="body" align="center" style={{ fontWeight: '600', marginBottom: 4 }}>
                Active Shareable Link
              </Typography>
              <Typography variant="caption" align="center" color={colors.textMuted}>
                Expires in 23 hours (May 08, 04:30 PM)
              </Typography>
              <View style={styles.shareActions}>
                <Button label="Copy Link" variant="outline" size="sm" onPress={handleShareLink} style={{ flex: 1, marginRight: 8 }} />
                <Button
                  label="Revoke"
                  variant="outline"
                  size="sm"
                  onPress={() => Alert.alert('Revoked', 'The link has been deactivated.')}
                  labelStyle={{ color: colors.danger }}
                  style={{ flex: 1, borderColor: colors.danger }}
                />
              </View>
            </Card>

            <Button label="Generate New Link" onPress={handleShareLink} style={{ marginTop: spacing.xl }} icon="add-circle-outline" />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const TipItem = ({ icon, text, isLast }: { icon: string; text: string; isLast?: boolean }) => (
  <View style={[styles.tipItem, !isLast && styles.tipBorder]}>
    <View style={styles.tipIcon}>
      <Ionicons name={icon as any} size={20} color={colors.primary} />
    </View>
    <Typography variant="bodySmall" style={{ flex: 1 }}>{text}</Typography>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: spacing['2xl'],
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  scoreBadge: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    ...shadow.md,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    backgroundColor: palette.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: spacing.lg,
    marginRight: spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing['4xl'],
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  breakdownCard: {
    gap: spacing.md,
  },
  breakdownItem: {
    marginBottom: spacing.sm,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  tipItem: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  tipBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  graphCard: {
    height: 220,
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: spacing.xl,
  },
  graphColumn: {
    alignItems: 'center',
    flex: 1,
  },
  graphBar: {
    width: 24,
    borderRadius: 4,
  },
  shareCard: {
    alignItems: 'center',
  },
  shareActions: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    width: '100%',
  },
});

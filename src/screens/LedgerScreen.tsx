import { StatusBar } from 'expo-status-bar';
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../theme/theme';
import { ledgerTransactions, pastTransactions } from '../content';

export const LedgerScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchive, setShowArchive] = useState(false);

  const allTransactions = useMemo(() => {
    return showArchive ? [...ledgerTransactions, ...pastTransactions] : ledgerTransactions;
  }, [showArchive]);

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allTransactions.filter(tx => 
      tx.member.toLowerCase().includes(query) || 
      tx.date.toLowerCase().includes(query) ||
      tx.type.toLowerCase().includes(query)
    );
  }, [searchQuery, allTransactions]);

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Group Ledger Search</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, date or type..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.muted} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={globalStyles.section}>
        <View style={styles.headerRow}>
          <Text style={globalStyles.sectionHeader}>Transactions</Text>
          <Text style={styles.resultsCount}>{filteredTransactions.length} found</Text>
        </View>
        
        <ScrollView style={styles.ledgerList} showsVerticalScrollIndicator={false}>
          <View style={globalStyles.listContainer}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx, index) => (
                <View key={tx.id} style={[styles.txRow, index === filteredTransactions.length - 1 && !showArchive && { borderBottomWidth: 0 }]}>
                  <View style={styles.txIconContainer}>
                    <Ionicons 
                      name={tx.type === 'Contribution' ? "arrow-down-circle" : "arrow-up-circle"} 
                      size={24} 
                      color={tx.type === 'Contribution' ? colors.success : colors.accent} 
                    />
                  </View>
                  <View style={styles.txInfo}>
                    <Text style={styles.txMember}>{tx.member}</Text>
                    <Text style={styles.txType}>{tx.type} • {tx.date}</Text>
                  </View>
                  <View style={styles.txAmountContainer}>
                    <Text style={[styles.txAmount, tx.type === 'Contribution' ? { color: colors.success } : { color: colors.accent }]}>
                      {tx.amount}
                    </Text>
                    <Text style={styles.txStatus}>{tx.status}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color={colors.divider} />
                <Text style={styles.emptyText}>No transactions match your search.</Text>
              </View>
            )}

            {!showArchive && (
              <Pressable 
                style={styles.archiveBtn} 
                onPress={() => setShowArchive(true)}
              >
                <Ionicons name="time-outline" size={18} color={colors.accent} />
                <Text style={styles.archiveBtnText}>View Past Transactions</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 12,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.primary,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultsCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
  },
  ledgerList: {
    maxHeight: 500,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 12,
  },
  txIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  txInfo: {
    flex: 1,
    gap: 2,
  },
  txMember: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  txType: {
    fontSize: 12,
    color: colors.muted,
  },
  txAmountContainer: {
    alignItems: 'flex-end',
    gap: 2,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '800',
  },
  txStatus: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
    textTransform: 'uppercase',
  },
  archiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    backgroundColor: colors.soft,
  },
  archiveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
  },
});

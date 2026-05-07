import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../theme/theme';
import { activeLoans } from '../content';
import { InputRow } from '../components/InputRow';

export const LoanScreen: React.FC = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Group Loan Management</Text>
        <Pressable 
          style={[styles.requestBtn, showRequestForm && styles.requestBtnActive]} 
          onPress={() => setShowRequestForm(!showRequestForm)}
        >
          <Ionicons name={showRequestForm ? "close" : "cash-outline"} size={20} color={showRequestForm ? colors.error : '#FFF'} />
          <Text style={styles.requestBtnText}>
            {showRequestForm ? "Cancel Request" : "Request New Loan"}
          </Text>
        </Pressable>

        {showRequestForm && (
          <View style={globalStyles.formContainer}>
            <Text style={styles.formTitle}>Loan Application</Text>
            <InputRow
              label="Requested Amount (RWF)"
              value={loanAmount}
              onChangeText={setLoanAmount}
              placeholder="e.g. 100,000"
            />
            <InputRow
              label="Purpose of Loan"
              value={purpose}
              onChangeText={setPurpose}
              placeholder="e.g. School fees, Business expansion"
            />
            <View style={styles.loanInfoBox}>
              <Ionicons name="information-circle-outline" size={18} color={colors.accent} />
              <Text style={styles.loanInfoText}>Interest Rate: 5% monthly • Maximum Period: 3 months</Text>
            </View>
            <Pressable style={globalStyles.primaryButton}>
              <Text style={globalStyles.primaryButtonText}>Submit Loan Application</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Active Group Loans</Text>
        <View style={globalStyles.listContainer}>
          {activeLoans.map((loan, index) => (
            <View key={loan.id} style={[styles.loanRow, index === activeLoans.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.loanHeader}>
                <Text style={styles.loanMember}>{loan.member}</Text>
                <View style={styles.interestBadge}>
                  <Text style={styles.interestText}>{loan.interest} INT</Text>
                </View>
              </View>
              
              <View style={styles.loanDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Principal</Text>
                  <Text style={styles.detailValue}>{loan.principal}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Current Balance</Text>
                  <Text style={[styles.detailValue, { color: colors.error }]}>{loan.balance}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Due Date</Text>
                  <Text style={styles.detailValue}>{loan.dueDate}</Text>
                </View>
              </View>

              <Pressable style={styles.repayBtn}>
                <Text style={styles.repayBtnText}>Record Repayment</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.accent,
    gap: 10,
  },
  requestBtnActive: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.error,
  },
  requestBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  loanInfoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 12,
    gap: 8,
    alignItems: 'center',
  },
  loanInfoText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
    flex: 1,
  },
  loanRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 16,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loanMember: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  interestBadge: {
    backgroundColor: colors.soft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  interestText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.muted,
  },
  loanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 11,
    color: colors.muted,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  repayBtn: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repayBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.accent,
  },
});

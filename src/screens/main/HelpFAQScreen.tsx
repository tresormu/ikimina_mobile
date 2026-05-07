import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';

const FAQS = [
  { q: 'How do I pay my contribution?',           a: 'Tap "Pay Now" on the Home screen. You will be guided through recipient verification, then redirected to MTN MoMo or USSD to complete the payment. Enter your transaction ID to confirm.' },
  { q: 'What happens if I miss a payment?',       a: 'A late fee of RWF 2,500 is applied automatically. Your credit score will also be affected. Contact your treasurer if you believe this was an error.' },
  { q: 'How is my credit score calculated?',      a: 'Your score (0–850) is based on: on-time payment rate, group tenure, loan repayment history, and group health. You qualify for a score after 3 months of activity.' },
  { q: 'How do I join a group?',                  a: 'Go to Group tab → Join a Group. Enter the 6-digit invite code provided by your treasurer. Review the group details and confirm.' },
  { q: 'Can I be in multiple groups?',            a: 'Yes. You can join multiple groups. Use the group switcher on the Group screen to switch between them.' },
  { q: 'How do I request a loan?',                a: 'Go to the Loans tab and tap "Request New Loan". Enter the amount and reason. The group will vote — you need 75% approval.' },
  { q: 'How do I share my credit passport?',      a: 'Go to Profile → Credit Passport → Share tab. Generate a secure link valid for 24 hours. You can revoke it at any time.' },
  { q: 'How do I change my phone number?',        a: 'Go to Profile → Settings → Change Phone Number. You will need to verify the new number with an OTP.' },
  { q: 'Is my data secure?',                      a: 'Yes. All data is encrypted in transit and at rest. Your financial history is only shared when you explicitly generate a shareable link.' },
];

export const HelpFAQScreen = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Typography variant="body" color={colors.textSecondary} style={{ marginBottom: spacing.xl }}>
        Find answers to common questions below.
      </Typography>

      {FAQS.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.faqItem}
          onPress={() => setExpanded(expanded === i ? null : i)}
          activeOpacity={0.8}
        >
          <View style={styles.faqHeader}>
            <Typography variant="body" style={{ fontWeight: '600', flex: 1, marginRight: spacing.md }}>
              {item.q}
            </Typography>
            <Ionicons
              name={expanded === i ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.textMuted}
            />
          </View>
          {expanded === i && (
            <Typography variant="bodySmall" color={colors.textSecondary} style={styles.faqAnswer}>
              {item.a}
            </Typography>
          )}
        </TouchableOpacity>
      ))}

      {/* Contact Support */}
      <Card variant="flat" padding="lg" style={styles.supportCard}>
        <Typography variant="body" style={{ fontWeight: '600', marginBottom: spacing.sm }}>
          Still need help?
        </Typography>
        <TouchableOpacity
          style={styles.supportRow}
          onPress={() => Linking.openURL('mailto:support@ikiminapass.com')}
        >
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <Typography variant="body" color={colors.primary} style={{ marginLeft: spacing.sm }}>
            support@ikiminapass.com
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.supportRow}
          onPress={() => Linking.openURL('tel:+250788000000')}
        >
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Typography variant="body" color={colors.primary} style={{ marginLeft: spacing.sm }}>
            +250 788 000 000
          </Typography>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: spacing.xl, paddingBottom: spacing['6xl'] },
  faqItem: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqAnswer: { marginTop: spacing.md, lineHeight: 20 },
  supportCard: { marginTop: spacing.lg },
  supportRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
});

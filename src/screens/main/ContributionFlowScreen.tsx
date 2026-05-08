import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Linking,
  Alert
} from 'react-native';
import { Layout } from '../../components/shared/Layout';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { colors, spacing, radius, shadow } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useGroup } from '../../context/GroupContext';
import { useNavigation } from '@react-navigation/native';

export const ContributionFlowScreen = () => {
  const { activeGroup: group } = useGroup();
  const navigation = useNavigation();
  const [step, setStep] = useState<'verify' | 'pay' | 'processing' | 'success'>('verify');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initiatePayment = (method: 'MTN MoMo' | 'Airtel Money') => {
    setStep('processing');
    
    // Simulate the Payment API triggering a push on the user's phone
    setTimeout(() => {
      // Show simulated native payment confirmation prompt
      Alert.alert(
        `${method} Payment`,
        `Do you want to pay RWF ${group.contributionAmount?.toLocaleString()} to IkiminaPass?`,
        [
          { 
            text: 'Cancel', 
            style: 'cancel',
            onPress: () => setStep('pay')
          },
          { 
            text: 'Confirm', 
            onPress: () => {
              setIsSubmitting(true);
              // Simulate backend recording the successful transaction
              setTimeout(() => {
                setIsSubmitting(false);
                setStep('success');
              }, 2000);
            } 
          }
        ]
      );
    }, 1500);
  };

  const handleMomoPayment = () => initiatePayment('MTN MoMo');
  const handleAirtelPayment = () => initiatePayment('Airtel Money');

  return (
    <Layout padding={false}>
      {/* Step Indicator */}
      <View style={styles.stepper}>
        <View style={[styles.stepDot, step === 'verify' ? styles.activeStep : null]} />
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step === 'pay' ? styles.activeStep : null]} />
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step === 'processing' ? styles.activeStep : null]} />
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step === 'success' ? styles.activeStep : null]} />
      </View>

      <View style={styles.container}>
        {step === 'verify' && (
          <View>
            <Typography variant="h2" style={styles.title}>Verify Recipient</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Please confirm the recipient details before proceeding with the payment.
            </Typography>
            
            <Card variant="outline" padding="xl" style={styles.recipientCard}>
              <View style={styles.recipientHeader}>
                <View style={styles.avatarSmall}>
                  <Typography variant="h4" color={colors.primary}>{group.recipientName?.[0]}</Typography>
                </View>
                <View>
                  <Typography variant="h3">{group.recipientName}</Typography>
                  <Typography variant="bodySmall" color={colors.textSecondary}>{group.recipientPhone}</Typography>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.amountRow}>
                <Typography variant="body">Amount Due</Typography>
                <Typography variant="h3" color={colors.primary}>RWF {group.contributionAmount?.toLocaleString()}</Typography>
              </View>
            </Card>

            <Button 
              label="Confirm & Proceed to Pay" 
              onPress={() => setStep('pay')} 
              style={{marginTop: spacing['2xl']}}
            />
          </View>
        )}

        {step === 'pay' && (
          <View>
            <Typography variant="h2" style={styles.title}>Choose Payment Method</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              The payment will be initiated via a secure push notification on your phone.
            </Typography>

            <TouchableOpacity style={styles.paymentOption} onPress={handleMomoPayment}>
              <View style={[styles.paymentIcon, { backgroundColor: '#FFCC00' }]}>
                <Typography variant="h4" color="#000" style={{ fontWeight: '800' }}>MoMo</Typography>
              </View>
              <View style={{flex: 1}}>
                <Typography variant="body" style={{fontWeight: '600'}}>MTN Mobile Money</Typography>
                <Typography variant="caption">Instant USSD Push Confirmation</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption} onPress={handleAirtelPayment}>
              <View style={[styles.paymentIcon, { backgroundColor: '#E11D48' }]}>
                <Typography variant="h4" color="#FFF" style={{ fontWeight: '800' }}>Airtel</Typography>
              </View>
              <View style={{flex: 1}}>
                <Typography variant="body" style={{fontWeight: '600'}}>Airtel Money</Typography>
                <Typography variant="caption">Instant USSD Push Confirmation</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
              <Typography variant="caption" color={colors.textSecondary} style={{ marginLeft: 8, flex: 1 }}>
                Make sure your phone is nearby to approve the transaction when the prompt appears.
              </Typography>
            </View>
          </View>
        )}

        {step === 'processing' && (
          <View style={styles.processingContainer}>
            <View style={styles.processingAnimation}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
            <Typography variant="h2" align="center" style={styles.title}>Waiting for Confirmation</Typography>
            <Typography variant="body" align="center" color={colors.textSecondary}>
              We've sent a payment request to your phone. Please enter your MoMo PIN to authorize the transaction.
            </Typography>
            
            <View style={styles.timerContainer}>
              <Typography variant="caption" color={colors.textMuted}>Waiting for response...</Typography>
            </View>

            <Button 
              label="Cancel Request" 
              variant="outline"
              onPress={() => setStep('pay')} 
              style={{marginTop: spacing['4xl'], width: '100%'}}
            />
          </View>
        )}

        {step === 'success' && (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={100} color={colors.success} />
            </View>
            <Typography variant="h1" align="center" style={{marginBottom: spacing.md}}>Payment Successful!</Typography>
            <Typography variant="body" align="center" color={colors.textSecondary} style={{marginBottom: spacing['2xl']}}>
              Your contribution of RWF {group.contributionAmount?.toLocaleString()} has been recorded and confirmed.
            </Typography>
            
            <Card variant="flat" padding="lg" style={{ width: '100%', marginBottom: spacing['3xl'] }}>
              <View style={styles.successDetailRow}>
                <Typography variant="caption">Transaction ID</Typography>
                <Typography variant="bodySmall" style={{ fontWeight: '600' }}>TXN-{Math.random().toString(36).substring(7).toUpperCase()}</Typography>
              </View>
              <View style={[styles.successDetailRow, { marginTop: 8 }]}>
                <Typography variant="caption">Status</Typography>
                <Typography variant="bodySmall" color={colors.success} style={{ fontWeight: '600' }}>CONFIRMED</Typography>
              </View>
            </Card>

            <Button 
              label="Back to Home" 
              onPress={() => navigation.goBack()} 
              style={{width: '100%'}}
            />
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  activeStep: {
    backgroundColor: colors.primary,
    width: 24,
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginBottom: spacing['2xl'],
  },
  recipientCard: {
    marginTop: spacing.md,
  },
  recipientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    marginTop: spacing.xl,
  },
  processingContainer: {
    alignItems: 'center',
    paddingTop: spacing['4xl'],
  },
  processingAnimation: {
    marginBottom: spacing['2xl'],
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    marginTop: spacing.xl,
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: spacing['2xl'],
  },
  successIcon: {
    marginBottom: spacing['xl'],
  },
  successDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

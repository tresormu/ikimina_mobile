import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
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
  const [step, setStep] = useState<'verify' | 'pay' | 'confirm' | 'success'>('verify');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMomoRedirect = () => {
    // In a real app, we would use a deep link or USSD string
    // For this demo, we simulate it
    Alert.alert(
      'MoMo Redirect',
      `You are being redirected to MTN MoMo to pay RWF ${group.contributionAmount?.toLocaleString()} to ${group.recipientName}.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Paid', onPress: () => setStep('confirm') }
      ]
    );
  };

  const handleUSSD = () => {
    Linking.openURL('tel:*182*1*1*0788111001*25000#');
    setStep('confirm');
  };

  const handleSubmitTransaction = () => {
    if (!transactionId) return;
    setIsSubmitting(true);
    // Simulate backend verification
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 2000);
  };

  return (
    <Layout padding={false}>
      {/* Step Indicator */}
      <View style={styles.stepper}>
        <View style={[styles.stepDot, step === 'verify' && styles.activeStep]} />
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step === 'pay' && styles.activeStep]} />
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step === 'confirm' && styles.activeStep]} />
        <View style={styles.stepLine} />
        <View style={[styles.stepDot, step === 'success' && styles.activeStep]} />
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
              Complete your payment using MTN MoMo or Airtel Money.
            </Typography>

            <TouchableOpacity style={styles.paymentOption} onPress={handleMomoRedirect}>
              <View style={[styles.paymentIcon, { backgroundColor: '#FFCC00' }]}>
                <Typography variant="h4" color="#000">MoMo</Typography>
              </View>
              <View style={{flex: 1}}>
                <Typography variant="body" style={{fontWeight: '600'}}>Pay via MTN MoMo App</Typography>
                <Typography variant="caption">Fastest and most secure</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentOption} onPress={handleUSSD}>
              <View style={[styles.paymentIcon, { backgroundColor: colors.surfaceAlt }]}>
                <Ionicons name="apps-outline" size={24} color={colors.textPrimary} />
              </View>
              <View style={{flex: 1}}>
                <Typography variant="body" style={{fontWeight: '600'}}>Pay via USSD (*182#)</Typography>
                <Typography variant="caption">Works without internet</Typography>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <Button 
              label="I have already paid" 
              variant="outline"
              onPress={() => setStep('confirm')} 
              style={{marginTop: spacing['4xl']}}
            />
          </View>
        )}

        {step === 'confirm' && (
          <View>
            <Typography variant="h2" style={styles.title}>Submit Transaction ID</Typography>
            <Typography variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Enter the Transaction ID from the SMS confirmation you received.
            </Typography>

            <View style={styles.inputContainer}>
              <Typography variant="label" style={{marginBottom: 8}}>Transaction ID / Code</Typography>
              <TextInput
                style={styles.input}
                placeholder="e.g. MOMO-9821-X"
                value={transactionId}
                onChangeText={setTransactionId}
                autoCapitalize="characters"
              />
            </View>

            <Button 
              label="Submit for Verification" 
              onPress={handleSubmitTransaction} 
              loading={isSubmitting}
              disabled={!transactionId}
              style={{marginTop: spacing.xl}}
            />
            
            <TouchableOpacity 
              style={styles.helpLink} 
              onPress={() => Alert.alert('Help', 'The transaction ID is the unique code found in your MoMo or Airtel confirmation SMS.')}
            >
              <Typography variant="bodySmall" color={colors.textSecondary}>Where can I find this?</Typography>
            </TouchableOpacity>
          </View>
        )}

        {step === 'success' && (
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color={colors.success} />
            </View>
            <Typography variant="h1" align="center" style={{marginBottom: spacing.md}}>Submission Received</Typography>
            <Typography variant="body" align="center" color={colors.textSecondary} style={{marginBottom: spacing['2xl']}}>
              Your payment is being verified by the system. You will receive a notification once it is confirmed.
            </Typography>
            
            <Button 
              label="Back to Dashboard" 
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
  inputContainer: {
    marginTop: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  helpLink: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: spacing['4xl'],
  },
  successIcon: {
    marginBottom: spacing['2xl'],
  },
});

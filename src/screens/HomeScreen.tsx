import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../theme/theme';
import { InputRow } from '../components/InputRow';
import { howItWorksSteps, homeHighlights } from '../content';

interface RegisterForm {
  groupName: string;
  treasurer: string;
  members: string;
  contributionAmount: string;
}

interface HomeScreenProps {
  form: RegisterForm;
  onChange: (value: RegisterForm) => void;
  onSubmit: () => void;
  registered: boolean;
  showRegisterForm: boolean;
  onToggleRegister: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  form,
  onChange,
  onSubmit,
  registered,
  showRegisterForm,
  onToggleRegister,
}) => {
  return (
    <View style={globalStyles.screen}>
      <View style={globalStyles.welcomeHero}>
        <Text style={globalStyles.heroTitle}>Welcome to IkiminaPass</Text>
        <Text style={globalStyles.heroSubtitle}>Professional group savings management.</Text>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Quick Actions</Text>
        <Pressable 
          style={[styles.actionButton, showRegisterForm && styles.actionButtonActive]} 
          onPress={onToggleRegister}
        >
          <Ionicons name="add-circle-outline" size={24} color={showRegisterForm ? '#FFF' : colors.accent} />
          <Text style={[styles.actionButtonText, showRegisterForm && styles.actionButtonTextActive]}>
            {showRegisterForm ? 'Cancel Registration' : 'Register New Group'}
          </Text>
        </Pressable>
      </View>

      {showRegisterForm && (
        <View style={globalStyles.formContainer}>
          <Text style={styles.formTitle}>Register Your Group</Text>
          <InputRow
            label="Group Name"
            value={form.groupName}
            onChangeText={(value) => onChange({ ...form, groupName: value })}
            placeholder="e.g. Kigali Savings Group"
          />
          <InputRow
            label="Treasurer Name"
            value={form.treasurer}
            onChangeText={(value) => onChange({ ...form, treasurer: value })}
            placeholder="e.g. Jane Mukamana"
          />
          <View style={styles.inputRowGroup}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <InputRow
                label="Members"
                value={form.members}
                onChangeText={(value) => onChange({ ...form, members: value })}
                placeholder="18"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <InputRow
                label="Amount (RWF)"
                value={form.contributionAmount}
                onChangeText={(value) => onChange({ ...form, contributionAmount: value })}
                placeholder="25,000"
              />
            </View>
          </View>

          <Pressable style={globalStyles.primaryButton} onPress={onSubmit}>
            <Text style={globalStyles.primaryButtonText}>Complete Registration</Text>
          </Pressable>
        </View>
      )}

      {registered && !showRegisterForm && (
        <View style={styles.successNotice}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text style={styles.successNoticeText}>Group registered successfully!</Text>
        </View>
      )}

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {howItWorksSteps.map((step, index) => (
            <View key={step.title} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDetail}>{step.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionHeader}>Key Highlights</Text>
        {homeHighlights.map((highlight, index) => (
          <View key={index} style={globalStyles.highlightItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.success} />
            <Text style={globalStyles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 0,
    borderWidth: 1.5,
    borderColor: colors.accent,
    gap: 10,
  },
  actionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.accent,
  },
  actionButtonTextActive: {
    color: '#FFF',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  inputRowGroup: {
    flexDirection: 'row',
  },
  successNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    gap: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  successNoticeText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },
  stepsContainer: {
    gap: 0,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  stepItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: '#FFF',
  },
  stepNumber: {
    width: 28,
    height: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  stepDetail: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
});

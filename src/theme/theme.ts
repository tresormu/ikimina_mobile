import { StyleSheet } from 'react-native';

export const colors = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  primary: '#1A1C1E',
  secondary: '#42474E',
  accent: '#0061A4',
  success: '#1E7A53',
  error: '#BA1A1A',
  text: '#1A1C1E',
  muted: '#74777F',
  outline: '#C4C6CF',
  divider: '#E1E2EC',
  soft: '#EFF3F6',
};

export const globalStyles = StyleSheet.create({
  screen: {
    padding: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: '#FFF',
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    gap: 4,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  welcomeHero: {
    paddingVertical: 10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.muted,
  },
  formContainer: {
    padding: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  highlightText: {
    fontSize: 15,
    color: colors.secondary,
  },
});

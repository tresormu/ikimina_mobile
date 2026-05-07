import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { colors, fontSize, fontWeight } from '../../design/tokens';

type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' 
  | 'body' | 'bodySmall' | 'bodyLarge' 
  | 'label' | 'caption';

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  align?: 'auto' | 'left' | 'center' | 'right' | 'justify';
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  style,
  color,
  align = 'auto',
  numberOfLines,
}) => {
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: fontSize['4xl'],
          fontWeight: fontWeight.bold,
          color: colors.textPrimary,
          lineHeight: 42,
        };
      case 'h2':
        return {
          fontSize: fontSize['3xl'],
          fontWeight: fontWeight.bold,
          color: colors.textPrimary,
          lineHeight: 36,
        };
      case 'h3':
        return {
          fontSize: fontSize['2xl'],
          fontWeight: fontWeight.semibold,
          color: colors.textPrimary,
          lineHeight: 32,
        };
      case 'h4':
        return {
          fontSize: fontSize.xl,
          fontWeight: fontWeight.semibold,
          color: colors.textPrimary,
          lineHeight: 28,
        };
      case 'bodyLarge':
        return {
          fontSize: fontSize.lg,
          fontWeight: fontWeight.regular,
          color: colors.textPrimary,
          lineHeight: 26,
        };
      case 'body':
        return {
          fontSize: fontSize.base,
          fontWeight: fontWeight.regular,
          color: colors.textPrimary,
          lineHeight: 22,
        };
      case 'bodySmall':
        return {
          fontSize: fontSize.sm,
          fontWeight: fontWeight.regular,
          color: colors.textSecondary,
          lineHeight: 18,
        };
      case 'label':
        return {
          fontSize: fontSize.sm,
          fontWeight: fontWeight.medium,
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        };
      case 'caption':
        return {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.medium,
          color: colors.textMuted,
        };
      default:
        return {};
    }
  };

  return (
    <Text 
      style={[
        getVariantStyle(), 
        { textAlign: align },
        color ? { color } : {}, 
        style
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  StyleProp,
  View
} from 'react-native';
import { colors, spacing, radius, fontSize, fontWeight, shadow } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  labelStyle,
}) => {
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isSecondary = variant === 'secondary';
  const isDanger = variant === 'danger';

  const getContainerStyle = (): ViewStyle => {
    let base: ViewStyle = { ...styles.container, ...styles[size] };
    
    if (variant === 'primary') {
      base.backgroundColor = colors.primary;
      if (!disabled && !loading) Object.assign(base, shadow.sm);
    } else if (isSecondary) {
      base.backgroundColor = colors.primaryLight;
    } else if (isOutline) {
      base.backgroundColor = 'transparent';
      base.borderWidth = 1;
      base.borderColor = colors.border;
    } else if (isGhost) {
      base.backgroundColor = 'transparent';
    } else if (isDanger) {
      base.backgroundColor = colors.danger;
    }

    if (disabled) {
      base.backgroundColor = variant === 'outline' || variant === 'ghost' ? 'transparent' : colors.surfaceAlt;
      base.borderColor = variant === 'outline' ? colors.border : undefined;
      base.opacity = 0.6;
    }

    return base;
  };

  const getTextStyle = (): TextStyle => {
    let base: TextStyle = { ...styles.text, ...styles[`text_${size}`] };

    if (variant === 'primary') {
      base.color = colors.textInverse;
    } else if (isSecondary) {
      base.color = colors.primary;
    } else if (isOutline || isGhost) {
      base.color = colors.textPrimary;
    } else if (isDanger) {
      base.color = colors.textInverse;
    }

    if (disabled) {
      base.color = colors.textMuted;
    }

    return base;
  };

  const iconColor = getTextStyle().color as string;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={size === 'sm' ? 16 : 20} color={iconColor} style={styles.leftIcon} />
          )}
          <Text style={[getTextStyle(), labelStyle]}>{label}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={size === 'sm' ? 16 : 20} color={iconColor} style={styles.rightIcon} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    height: 36,
  },
  md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    height: 48,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['2xl'],
    height: 56,
    borderRadius: radius.lg,
  },
  text: {
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  text_sm: {
    fontSize: fontSize.sm,
  },
  text_md: {
    fontSize: fontSize.base,
  },
  text_lg: {
    fontSize: fontSize.lg,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Typography } from '../ui/Typography';
import { colors, spacing, palette } from '../../design/tokens';
import { Ionicons } from '@expo/vector-icons';

export const LoadingScreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Ionicons name="refresh-circle-outline" size={64} color={colors.primary} />
      </Animated.View>
      <Typography variant="h3" style={styles.text}>IkiminaPass</Typography>
      <Typography variant="bodySmall" color={colors.textSecondary}>
        Your financial journey starts here...
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
});

import React from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../design/tokens';

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  padding?: boolean;
  bg?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  style,
  scrollable = false,
  padding = true,
  bg = colors.bg,
}) => {
  const insets = useSafeAreaInsets();
  
  const contentStyle = [
    styles.container,
    { 
      backgroundColor: bg,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    padding && { paddingHorizontal: spacing.xl },
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView 
        style={{ backgroundColor: bg }}
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={contentStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

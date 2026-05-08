import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { colors } from '../../design/tokens';
import { Typography } from '../ui/Typography';
import { useApp } from '../../context/AppContext';

export const LoadingOverlay = () => {
  const { isLoading } = useApp();

  if (!isLoading) return null;

  return (
    <Modal transparent animationType="fade" visible={isLoading}>
      <View style={styles.container}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Typography variant="body" style={{ marginTop: 12, fontWeight: '600' }}>
            Loading...
          </Typography>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
});

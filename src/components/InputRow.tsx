import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/theme';

interface InputRowProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

export const InputRow: React.FC<InputRowProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#FFF',
  },
});

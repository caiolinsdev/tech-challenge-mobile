import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Loading em tela cheia
// ==========================================

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Carregando...' }: LoadingScreenProps) {
  return (
    <View style={styles.fullscreen}>
      <ActivityIndicator size="large" color={colors.primary[500]} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

// ==========================================
// Loading inline (para listas)
// ==========================================

export function LoadingMore() {
  return (
    <View style={styles.inline}>
      <ActivityIndicator size="small" color={colors.primary[500]} />
    </View>
  );
}

// ==========================================
// Styles
// ==========================================

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  message: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  inline: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
});


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string | null;
    author: { name: string };
    createdAt: string;
  };
  onPress: () => void;
}

// ==========================================
// Funções Auxiliares
// ==========================================

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return 'agora';
  } else if (diffHours < 24) {
    return `${diffHours}h atrás`;
  } else if (diffDays < 7) {
    return `${diffDays}d atrás`;
  } else {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  }
}

// ==========================================
// Componente
// ==========================================

export function PostCard({ post, onPress }: PostCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>
      
      <Text style={styles.meta}>
        {post.author.name} • {formatDate(post.createdAt)}
      </Text>
      
      {post.description && (
        <Text style={styles.description} numberOfLines={2}>
          {post.description}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// ==========================================
// Styles
// ==========================================

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.cardPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  meta: {
    ...typography.labelSmall,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
  },
});


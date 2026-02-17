import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';

import { usePost } from '../hooks/usePosts';
import { LoadingScreen, EmptyState } from '../components';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

type PostDetailRouteProp = RouteProp<{ PostDetail: { id: string } }, 'PostDetail'>;

// ==========================================
// Funções Auxiliares
// ==========================================

function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// ==========================================
// Screen
// ==========================================

export function PostDetailScreen() {
  const route = useRoute<PostDetailRouteProp>();
  const { id } = route.params;

  const { post, isLoading, error } = usePost(id);

  // Loading
  if (isLoading) {
    return <LoadingScreen message="Carregando post..." />;
  }

  // Erro
  if (error || !post) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          icon="❌"
          title="Post não encontrado"
          description="O post que você está procurando não existe ou foi removido."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Título */}
        <Text style={styles.title}>{post.title}</Text>

        {/* Meta */}
        <View style={styles.metaContainer}>
          <View style={styles.authorContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {post.author.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.authorName}>{post.author.name}</Text>
              {post.author.bio && (
                <Text style={styles.authorBio} numberOfLines={1}>
                  {post.author.bio}
                </Text>
              )}
            </View>
          </View>
          <Text style={styles.date}>{formatFullDate(post.createdAt)}</Text>
        </View>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Descrição */}
        {post.description && (
          <Text style={styles.description}>{post.description}</Text>
        )}

        {/* Conteúdo */}
        <Text style={styles.content_text}>{post.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// Styles
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
    paddingBottom: spacing['3xl'],
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  authorName: {
    ...typography.label,
    color: colors.text.primary,
  },
  authorBio: {
    ...typography.labelSmall,
    color: colors.text.tertiary,
    maxWidth: 200,
  },
  date: {
    ...typography.labelSmall,
    color: colors.text.tertiary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[800],
    marginBottom: spacing.lg,
  },
  description: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
    paddingLeft: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary[500],
  },
  content_text: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 28,
  },
});


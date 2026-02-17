import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

interface Post {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
  };
  createdAt: string;
}

// ==========================================
// Dados Mock (Temporário)
// ==========================================

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Introdução ao React Native',
    description: 'Aprenda os conceitos básicos do React Native e como criar seu primeiro aplicativo mobile.',
    author: { name: 'Prof. João' },
    createdAt: '2026-02-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Docker para Desenvolvedores',
    description: 'Entenda como containerizar suas aplicações usando Docker e Docker Compose.',
    author: { name: 'Prof. Maria' },
    createdAt: '2026-02-14T08:00:00Z',
  },
  {
    id: '3',
    title: 'PostgreSQL: Boas Práticas',
    description: 'Dicas e truques para otimizar suas queries e modelar seu banco de dados corretamente.',
    author: { name: 'Prof. Carlos' },
    createdAt: '2026-02-13T14:45:00Z',
  },
];

// ==========================================
// Componentes
// ==========================================

function PostCard({ post, onPress }: { post: Post; onPress: () => void }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={styles.cardMeta}>
        {post.author.name} • {formatDate(post.createdAt)}
      </Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {post.description}
      </Text>
    </TouchableOpacity>
  );
}

// ==========================================
// Screen
// ==========================================

export function HomeScreen() {
  const { isProfessor } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // TODO: Buscar posts da API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handlePostPress = (post: Post) => {
    // TODO: Navegar para tela de detalhes
    console.log('Post selecionado:', post.id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => handlePostPress(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary[500]}
            colors={[colors.primary[500]]}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Posts Recentes</Text>
            <Text style={styles.headerSubtitle}>
              {MOCK_POSTS.length} posts encontrados
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>Nenhum post encontrado</Text>
          </View>
        }
      />

      {/* FAB - Apenas para professores */}
      {isProfessor && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            // TODO: Navegar para criar post
            console.log('Criar novo post');
          }}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      )}
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
  listContent: {
    padding: spacing.screenPadding,
    paddingBottom: 100,
  },
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.cardPadding,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  cardTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  cardMeta: {
    ...typography.labelSmall,
    color: colors.text.tertiary,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.body,
    color: colors.text.secondary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 28,
    color: colors.white,
    fontWeight: 'bold',
  },
});


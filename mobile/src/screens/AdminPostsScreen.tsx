import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { api } from '../services/api';
import { postsService } from '../services/posts';
import { AdminPostCard } from '../components/AdminPostCard';
import { EmptyState, LoadingScreen, LoadingMore } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

interface Post {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

type AdminPostsNavigationProp = NativeStackNavigationProp<{
  AdminPosts: undefined;
  CreatePost: undefined;
  EditPost: { id: string; title: string; content: string; description: string | null };
}>;

// ==========================================
// Screen
// ==========================================

export function AdminPostsScreen() {
  const navigation = useNavigation<AdminPostsNavigationProp>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const hasMore = currentPage < totalPages;

  const fetchPosts = useCallback(async (page: number, isRefresh = false) => {
    try {
      const response = await postsService.listMine({ page, limit: 10 });
      const { data, meta } = response.data;

      if (isRefresh || page === 1) {
        setPosts(data);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }

      setCurrentPage(meta.page);
      setTotalPages(meta.totalPages);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar os posts');
    }
  }, []);

  // Recarregar ao focar na tela
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchPosts(1, true).finally(() => setIsLoading(false));
    }, [fetchPosts])
  );

  const refresh = async () => {
    setIsRefreshing(true);
    await fetchPosts(1, true);
    setIsRefreshing(false);
  };

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    await fetchPosts(currentPage + 1);
    setIsLoadingMore(false);
  };

  const handleEdit = async (post: Post) => {
    try {
      const detail = await api.get(`/posts/${post.id}`);
      navigation.navigate('EditPost', {
        id: post.id,
        title: detail.data.title,
        content: detail.data.content,
        description: detail.data.description,
      });
    } catch {
      navigation.navigate('EditPost', {
        id: post.id,
        title: post.title,
        content: '',
        description: post.description,
      });
    }
  };

  const handleDelete = (post: Post) => {
    Alert.alert(
      'Excluir Post?',
      'Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await postsService.delete(post.id);
              Alert.alert('Sucesso', 'Post excluído com sucesso');
              refresh();
            } catch (error) {
              Alert.alert(
                'Erro',
                error instanceof Error ? error.message : 'Erro ao excluir post'
              );
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingScreen message="Carregando seus posts..." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AdminPostCard
            post={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={colors.primary[500]}
            colors={[colors.primary[500]]}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Meus Posts</Text>
            <Text style={styles.headerSubtitle}>
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="📝"
            title="Nenhum post ainda"
            description="Crie seu primeiro post clicando no botão +"
          />
        }
        ListFooterComponent={
          isLoadingMore && hasMore ? <LoadingMore /> : null
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
    marginBottom: spacing.md,
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
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
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

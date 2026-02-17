import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import { usePosts, Post } from '../hooks/usePosts';
import { useDebounce } from '../hooks/useDebounce';
import { PostCard, SearchInput, EmptyState, LoadingScreen, LoadingMore } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

type HomeScreenNavigationProp = NativeStackNavigationProp<{
  Home: undefined;
  PostDetail: { id: string };
  CreatePost: undefined;
}>;

// ==========================================
// Screen
// ==========================================

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { isProfessor } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    posts,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    refresh,
    loadMore,
  } = usePosts({ search: debouncedSearch });

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { id: post.id });
  };

  const handleCreatePost = () => {
    navigation.navigate('CreatePost');
  };

  // Loading inicial
  if (isLoading) {
    return <LoadingScreen message="Carregando posts..." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => handlePostPress(item)} />
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
            <SearchInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="🔍 Buscar posts..."
            />
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>
                {debouncedSearch ? 'Resultados da busca' : 'Posts Recentes'}
              </Text>
              <Text style={styles.headerSubtitle}>
                {posts.length} post{posts.length !== 1 ? 's' : ''} encontrado{posts.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="📭"
            title="Nenhum post encontrado"
            description={
              debouncedSearch
                ? 'Tente buscar por outro termo'
                : 'Ainda não há posts publicados'
            }
          />
        }
        ListFooterComponent={
          isLoadingMore && hasMore ? <LoadingMore /> : null
        }
      />

      {isProfessor && (
        <TouchableOpacity style={styles.fab} onPress={handleCreatePost}>
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
    marginBottom: spacing.md,
  },
  headerInfo: {
    marginTop: spacing.sm,
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

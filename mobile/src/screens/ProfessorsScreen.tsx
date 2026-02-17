import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useProfessors } from '../hooks/useProfessors';
import { professorsService } from '../services/professors';
import { ProfessorCard } from '../components/ProfessorCard';
import { EmptyState, LoadingScreen, LoadingMore } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

type ProfessorsScreenNavigationProp = NativeStackNavigationProp<{
  Professors: undefined;
  CreateProfessor: undefined;
  EditProfessor: { id: string; name: string; email: string; bio: string | null; subject: string | null };
}>;

// ==========================================
// Screen
// ==========================================

export function ProfessorsScreen() {
  const navigation = useNavigation<ProfessorsScreenNavigationProp>();

  const {
    professors,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    refresh,
    loadMore,
  } = useProfessors();

  const handleEdit = (professor: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    subject: string | null;
  }) => {
    navigation.navigate('EditProfessor', {
      id: professor.id,
      name: professor.name,
      email: professor.email,
      bio: professor.bio,
      subject: professor.subject,
    });
  };

  const handleDelete = (professor: { id: string; name: string }) => {
    Alert.alert(
      'Excluir Professor',
      `Deseja realmente excluir "${professor.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await professorsService.delete(professor.id);
              Alert.alert('Sucesso', 'Professor excluído com sucesso');
              refresh();
            } catch (error) {
              Alert.alert(
                'Erro',
                error instanceof Error ? error.message : 'Erro ao excluir professor'
              );
            }
          },
        },
      ]
    );
  };

  const handleCreate = () => {
    navigation.navigate('CreateProfessor');
  };

  if (isLoading) {
    return <LoadingScreen message="Carregando professores..." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={professors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProfessorCard
            professor={item}
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
            <Text style={styles.headerTitle}>Professores</Text>
            <Text style={styles.headerSubtitle}>
              {professors.length} professor{professors.length !== 1 ? 'es' : ''} cadastrado{professors.length !== 1 ? 's' : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="👨‍🏫"
            title="Nenhum professor encontrado"
            description="Cadastre o primeiro professor clicando no botão +"
          />
        }
        ListFooterComponent={
          isLoadingMore && hasMore ? <LoadingMore /> : null
        }
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleCreate}>
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

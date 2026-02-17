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

import { useStudents } from '../hooks/useStudents';
import { studentsService } from '../services/students';
import { StudentCard } from '../components/StudentCard';
import { EmptyState, LoadingScreen, LoadingMore } from '../components';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

type StudentsScreenNavigationProp = NativeStackNavigationProp<{
  Students: undefined;
  CreateStudent: undefined;
  EditStudent: { id: string; name: string; email: string; enrollment: string | null; grade: string | null };
}>;

// ==========================================
// Screen
// ==========================================

export function StudentsScreen() {
  const navigation = useNavigation<StudentsScreenNavigationProp>();

  const {
    students,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    refresh,
    loadMore,
  } = useStudents();

  const handleEdit = (student: {
    id: string;
    name: string;
    email: string;
    enrollment: string | null;
    grade: string | null;
  }) => {
    navigation.navigate('EditStudent', {
      id: student.id,
      name: student.name,
      email: student.email,
      enrollment: student.enrollment,
      grade: student.grade,
    });
  };

  const handleDelete = (student: { id: string; name: string }) => {
    Alert.alert(
      'Excluir Estudante',
      `Deseja realmente excluir "${student.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await studentsService.delete(student.id);
              Alert.alert('Sucesso', 'Estudante excluído com sucesso');
              refresh();
            } catch (error) {
              Alert.alert(
                'Erro',
                error instanceof Error ? error.message : 'Erro ao excluir estudante'
              );
            }
          },
        },
      ]
    );
  };

  const handleCreate = () => {
    navigation.navigate('CreateStudent');
  };

  if (isLoading) {
    return <LoadingScreen message="Carregando estudantes..." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
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
            <Text style={styles.headerTitle}>Estudantes</Text>
            <Text style={styles.headerSubtitle}>
              {students.length} estudante{students.length !== 1 ? 's' : ''} cadastrado{students.length !== 1 ? 's' : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="🎓"
            title="Nenhum estudante encontrado"
            description="Cadastre o primeiro estudante clicando no botão +"
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

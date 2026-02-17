import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { ProfileStackParamList } from '../navigation/AppNavigator';

// ==========================================
// Tipos
// ==========================================

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

// ==========================================
// Screen
// ==========================================

export function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, signOut, isProfessor } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const getRoleName = (role: string) => {
    return role === 'PROFESSOR' ? 'Professor' : 'Estudante';
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>
              {user?.role ? getRoleName(user.role) : 'Usuário'}
            </Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tipo de Conta</Text>
            <Text style={styles.infoValue}>
              {user?.role ? getRoleName(user.role) : '-'}
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Permissões</Text>
            <Text style={styles.infoValue}>
              {isProfessor ? 'Criar, editar e excluir' : 'Apenas visualizar'}
            </Text>
          </View>
        </View>

        {/* Admin Menu - Apenas para professores */}
        {isProfessor && (
          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Administração</Text>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('AdminPosts')}
            >
              <Text style={styles.menuIcon}>📝</Text>
              <Text style={styles.menuItemText}>Gerenciar Posts</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Professors')}
            >
              <Text style={styles.menuIcon}>👨‍🏫</Text>
              <Text style={styles.menuItemText}>Gerenciar Professores</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Students')}
            >
              <Text style={styles.menuIcon}>🎓</Text>
              <Text style={styles.menuItemText}>Gerenciar Estudantes</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.version}>Versão 1.0.0</Text>
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
  content: {
    padding: spacing.screenPadding,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
  },
  userName: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  roleBadge: {
    backgroundColor: colors.primary[900],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  roleText: {
    ...typography.labelSmall,
    color: colors.primary[300],
  },
  infoCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.cardPadding,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    ...typography.label,
    color: colors.text.secondary,
  },
  infoValue: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[800],
  },
  menuSection: {
    marginBottom: spacing.xl,
  },
  menuTitle: {
    ...typography.label,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    paddingHorizontal: spacing.cardPadding,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuItemText: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.text.tertiary,
  },
  logoutButton: {
    backgroundColor: colors.error.dark,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.buttonPadding,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  logoutButtonText: {
    ...typography.button,
    color: colors.white,
  },
  version: {
    ...typography.labelSmall,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});


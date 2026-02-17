import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    email: string;
    enrollment: string | null;
    grade: string | null;
  };
  onEdit: () => void;
  onDelete: () => void;
}

// ==========================================
// Componente
// ==========================================

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {student.name}
          </Text>
          {student.enrollment && (
            <Text style={styles.enrollment} numberOfLines={1}>
              Mat: {student.enrollment}
            </Text>
          )}
          <Text style={styles.email} numberOfLines={1}>
            {student.email}
          </Text>
          {student.grade && (
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>{student.grade}</Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onEdit}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={onDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  info: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.label,
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  enrollment: {
    ...typography.labelSmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  email: {
    ...typography.labelSmall,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  gradeBadge: {
    backgroundColor: colors.secondary[900],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.secondary[700],
  },
  gradeText: {
    ...typography.labelSmall,
    color: colors.secondary[300],
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  actionIcon: {
    fontSize: 16,
  },
});

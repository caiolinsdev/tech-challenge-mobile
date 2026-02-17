import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { studentsService } from '../services/students';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

type EditStudentRouteProp = RouteProp<{
  EditStudent: {
    id: string;
    name: string;
    email: string;
    enrollment: string | null;
    grade: string | null;
  };
}, 'EditStudent'>;

interface FormErrors {
  name?: string;
}

// ==========================================
// Opções de Série/Turma
// ==========================================

const GRADE_OPTIONS = [
  { value: '1º Ano', label: '1º Ano' },
  { value: '2º Ano', label: '2º Ano' },
  { value: '3º Ano', label: '3º Ano' },
  { value: 'Pós-Graduação', label: 'Pós-Graduação' },
];

// ==========================================
// Screen
// ==========================================

export function EditStudentScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditStudentRouteProp>();
  const { id, name: initialName, email, enrollment: initialEnrollment, grade: initialGrade } = route.params;

  const [name, setName] = useState(initialName);
  const [enrollment, setEnrollment] = useState(initialEnrollment || '');
  const [grade, setGrade] = useState(initialGrade || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async () => {
    const validationErrors: FormErrors = {};

    if (!name.trim()) {
      validationErrors.name = 'Nome é obrigatório';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await studentsService.update(id, {
        name: name.trim(),
        enrollment: enrollment.trim() || undefined,
        grade: grade.trim() || undefined,
      });

      Alert.alert('Sucesso', 'Estudante atualizado com sucesso', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao atualizar estudante'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Nome */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome completo *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Digite o nome"
              placeholderTextColor={colors.text.tertiary}
              value={name}
              onChangeText={setName}
              editable={!isLoading}
              autoCapitalize="words"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Email (não editável) */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email (não editável)</Text>
            <View style={styles.disabledInputContainer}>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={email}
                editable={false}
              />
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          </View>

          {/* Matrícula */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Matrícula</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2026001"
              placeholderTextColor={colors.text.tertiary}
              value={enrollment}
              onChangeText={setEnrollment}
              editable={!isLoading}
            />
          </View>

          {/* Série/Turma */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Série/Turma</Text>
            <View style={styles.gradeButtons}>
              {GRADE_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.gradeButton,
                    grade === opt.value && styles.gradeButtonActive,
                  ]}
                  onPress={() => setGrade(opt.value)}
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.gradeButtonText,
                      grade === opt.value && styles.gradeButtonTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Botão */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
    paddingBottom: spacing['3xl'],
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.inputPadding,
    color: colors.text.primary,
    fontSize: typography.body.fontSize,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  inputError: {
    borderColor: colors.error.main,
  },
  disabledInputContainer: {
    position: 'relative',
  },
  disabledInput: {
    backgroundColor: colors.background.secondary,
    color: colors.text.tertiary,
    paddingRight: 50,
  },
  lockIcon: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    lineHeight: 48,
    fontSize: 16,
  },
  gradeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  gradeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.gray[700],
  },
  gradeButtonActive: {
    backgroundColor: colors.primary[900],
    borderColor: colors.primary[500],
  },
  gradeButtonText: {
    ...typography.label,
    color: colors.text.primary,
  },
  gradeButtonTextActive: {
    color: colors.primary[300],
  },
  errorText: {
    ...typography.labelSmall,
    color: colors.error.main,
    marginTop: spacing.xs,
  },
  button: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    paddingVertical: spacing.buttonPadding,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    backgroundColor: colors.primary[700],
    opacity: 0.7,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
});

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
import { useNavigation } from '@react-navigation/native';

import { studentsService } from '../services/students';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

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
// Validação
// ==========================================

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validate(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Nome é obrigatório';
  }

  if (!data.email.trim()) {
    errors.email = 'Email é obrigatório';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido';
  }

  if (!data.password) {
    errors.password = 'Senha é obrigatória';
  } else if (data.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Senhas não conferem';
  }

  return errors;
}

// ==========================================
// Screen
// ==========================================

export function CreateStudentScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [grade, setGrade] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async () => {
    const validationErrors = validate({ name, email, password, confirmPassword });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await studentsService.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        enrollment: enrollment.trim() || undefined,
        grade: grade.trim() || undefined,
      });

      Alert.alert('Sucesso', 'Estudante cadastrado com sucesso', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao cadastrar estudante'
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

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="email@exemplo.com"
              placeholderTextColor={colors.text.tertiary}
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirmar Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar senha *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.confirmPassword && styles.inputError]}
                placeholder="Repita a senha"
                placeholderTextColor={colors.text.tertiary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!isLoading}
                secureTextEntry={!showPassword}
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
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
              <Text style={styles.buttonText}>CADASTRAR</Text>
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
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 20,
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

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

import { professorsService } from '../services/professors';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Tipos
// ==========================================

type EditProfessorRouteProp = RouteProp<{
  EditProfessor: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    subject: string | null;
  };
}, 'EditProfessor'>;

interface FormErrors {
  name?: string;
}

// ==========================================
// Screen
// ==========================================

export function EditProfessorScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditProfessorRouteProp>();
  const { id, name: initialName, email, bio: initialBio, subject: initialSubject } = route.params;

  const [name, setName] = useState(initialName);
  const [subject, setSubject] = useState(initialSubject || '');
  const [bio, setBio] = useState(initialBio || '');
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
      await professorsService.update(id, {
        name: name.trim(),
        subject: subject.trim() || undefined,
        bio: bio.trim() || undefined,
      });

      Alert.alert('Sucesso', 'Professor atualizado com sucesso', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao atualizar professor'
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

          {/* Disciplina */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Disciplina</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Matemática, Português..."
              placeholderTextColor={colors.text.tertiary}
              value={subject}
              onChangeText={setSubject}
              editable={!isLoading}
            />
          </View>

          {/* Bio */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição sobre o professor..."
              placeholderTextColor={colors.text.tertiary}
              value={bio}
              onChangeText={setBio}
              editable={!isLoading}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
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
  textArea: {
    minHeight: 100,
    paddingTop: spacing.md,
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

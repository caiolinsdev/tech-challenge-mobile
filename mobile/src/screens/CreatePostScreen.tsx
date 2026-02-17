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

import { postsService } from '../services/posts';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

// ==========================================
// Validação
// ==========================================

interface FormErrors {
  title?: string;
  content?: string;
}

function validate(data: { title: string; content: string }): FormErrors {
  const errors: FormErrors = {};

  if (!data.title.trim()) {
    errors.title = 'Título é obrigatório';
  } else if (data.title.length > 100) {
    errors.title = 'Título deve ter no máximo 100 caracteres';
  }

  if (!data.content.trim()) {
    errors.content = 'Conteúdo é obrigatório';
  } else if (data.content.length < 50) {
    errors.content = 'Conteúdo deve ter pelo menos 50 caracteres';
  }

  return errors;
}

// ==========================================
// Screen
// ==========================================

export function CreatePostScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async () => {
    const validationErrors = validate({ title, content });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await postsService.create({
        title: title.trim(),
        content: content.trim(),
        description: description.trim() || undefined,
      });

      Alert.alert('Sucesso', 'Post publicado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao criar post'
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
          {/* Título */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              placeholder="Título do post"
              placeholderTextColor={colors.text.tertiary}
              value={title}
              onChangeText={setTitle}
              editable={!isLoading}
              maxLength={100}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            <Text style={styles.charCount}>{title.length}/100</Text>
          </View>

          {/* Descrição */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textAreaSmall]}
              placeholder="Breve resumo do post (opcional)"
              placeholderTextColor={colors.text.tertiary}
              value={description}
              onChangeText={setDescription}
              editable={!isLoading}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Conteúdo */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Conteúdo *</Text>
            <TextInput
              style={[styles.input, styles.textAreaLarge, errors.content && styles.inputError]}
              placeholder="Escreva o conteúdo do post (mínimo 50 caracteres)..."
              placeholderTextColor={colors.text.tertiary}
              value={content}
              onChangeText={setContent}
              editable={!isLoading}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
            {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
            <Text style={styles.charCount}>{content.length} caracteres</Text>
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
              <Text style={styles.buttonText}>PUBLICAR POST</Text>
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
  textAreaSmall: {
    minHeight: 80,
    paddingTop: spacing.md,
  },
  textAreaLarge: {
    minHeight: 200,
    paddingTop: spacing.md,
  },
  charCount: {
    ...typography.labelSmall,
    color: colors.text.tertiary,
    textAlign: 'right',
    marginTop: spacing.xs,
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

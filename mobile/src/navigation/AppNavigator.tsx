import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ProfessorsScreen } from '../screens/ProfessorsScreen';
import { CreateProfessorScreen } from '../screens/CreateProfessorScreen';
import { EditProfessorScreen } from '../screens/EditProfessorScreen';
import { AdminPostsScreen } from '../screens/AdminPostsScreen';
import { CreatePostScreen } from '../screens/CreatePostScreen';
import { EditPostScreen } from '../screens/EditPostScreen';

// ==========================================
// Tipos de Navegação
// ==========================================

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  HomeStack: undefined;
  ProfileStack: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  PostDetail: { id: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  AdminPosts: undefined;
  CreatePost: undefined;
  EditPost: {
    id: string;
    title: string;
    content: string;
    description: string | null;
  };
  Professors: undefined;
  CreateProfessor: undefined;
  EditProfessor: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    subject: string | null;
  };
};

// ==========================================
// Navigators
// ==========================================

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const ProfileStackNav = createNativeStackNavigator<ProfileStackParamList>();

// ==========================================
// Auth Navigator
// ==========================================

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// ==========================================
// Home Stack Navigator
// ==========================================

function HomeStackNavigator() {
  return (
    <HomeStackNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.secondary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <HomeStackNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Posts',
        }}
      />
      <HomeStackNav.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          title: 'Post',
        }}
      />
    </HomeStackNav.Navigator>
  );
}

// ==========================================
// Profile Stack Navigator
// ==========================================

function ProfileStackNavigator() {
  return (
    <ProfileStackNav.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.secondary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <ProfileStackNav.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
      <ProfileStackNav.Screen
        name="AdminPosts"
        component={AdminPostsScreen}
        options={{
          title: 'Gerenciar Posts',
        }}
      />
      <ProfileStackNav.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: 'Novo Post',
        }}
      />
      <ProfileStackNav.Screen
        name="EditPost"
        component={EditPostScreen}
        options={{
          title: 'Editar Post',
        }}
      />
      <ProfileStackNav.Screen
        name="Professors"
        component={ProfessorsScreen}
        options={{
          title: 'Professores',
        }}
      />
      <ProfileStackNav.Screen
        name="CreateProfessor"
        component={CreateProfessorScreen}
        options={{
          title: 'Novo Professor',
        }}
      />
      <ProfileStackNav.Screen
        name="EditProfessor"
        component={EditProfessorScreen}
        options={{
          title: 'Editar Professor',
        }}
      />
    </ProfileStackNav.Navigator>
  );
}

// ==========================================
// Main Tab Navigator
// ==========================================

function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.gray[800],
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.text.tertiary,
      }}
    >
      <MainTab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Posts',
          tabBarLabel: 'Posts',
          tabBarIcon: () => (
            <Text style={styles.tabIconEmoji}>📝</Text>
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: () => (
            <Text style={styles.tabIconEmoji}>👤</Text>
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

// ==========================================
// App Navigator
// ==========================================

export function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Loading screen
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// Styles
// ==========================================

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconEmoji: {
    fontSize: 22,
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
});

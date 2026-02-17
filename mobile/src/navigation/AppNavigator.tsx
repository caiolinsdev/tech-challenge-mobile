import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
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
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  PostDetail: { id: string };
};

// ==========================================
// Navigators
// ==========================================

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

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
    <HomeStack.Navigator
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
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Posts',
        }}
      />
      <HomeStack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          title: 'Post',
        }}
      />
    </HomeStack.Navigator>
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
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIcon}>
              <View style={[styles.iconPlaceholder, { backgroundColor: color }]} />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerTintColor: colors.text.primary,
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIcon}>
              <View style={[styles.iconPlaceholder, { backgroundColor: color }]} />
            </View>
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
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
});

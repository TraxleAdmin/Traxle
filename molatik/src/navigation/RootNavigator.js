import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import AdminDashboard from '../screens/AdminDashboard';
import EmployeeDashboard from '../screens/EmployeeDashboard';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : userData?.role === 'admin' ? (
          <Stack.Screen name="Admin" component={AdminDashboard} />
        ) : (
          <Stack.Screen name="Employee" component={EmployeeDashboard} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

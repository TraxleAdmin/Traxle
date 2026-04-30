import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import MainScreen from '../screens/MainScreen';
import CameraScreen from "../screens/CameraScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import AddEditProductScreen from "../screens/AddEditProductScreen";

import { getRole } from '../store/roleStore';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Geçici boş ekranlar (sonraki adımlarda doldurulacak)

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('RoleSelection');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkInitialRole = async () => {
      const role = await getRole();
      if (role) {
        setInitialRoute('Main');
      }
      setLoading(false);
    };
    checkInitialRole();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="RoleSelection"
          component={RoleSelectionScreen}
          options={{ title: 'Rol Seçimi', headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Ana Menü', headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: 'Barkod Okuyucu' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Ürün Detayı' }}
        />
        <Stack.Screen
          name="AddEditProduct"
          component={AddEditProductScreen}
          options={{ title: 'Ürün Ekle / Düzenle' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

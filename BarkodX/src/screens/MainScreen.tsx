import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getRole, isAdmin } from '../store/roleStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function MainScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [role, setRole] = useState<string | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const currentRole = await getRole();
      if (!currentRole) {
        navigation.replace('RoleSelection');
        return;
      }
      setRole(currentRole);
      setIsUserAdmin(await isAdmin());
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
        <Text style={styles.roleText}>Mevcut Rol: {role === 'admin' ? 'Admin' : role}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Barkod Okut (Stok Bul)</Text>
        </TouchableOpacity>

        {isUserAdmin && (
          <TouchableOpacity
            style={[styles.primaryButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('AddEditProduct', {})}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Yeni Ürün Ekle</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  roleText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  buttonContainer: {
    padding: 20,
    gap: 16,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});

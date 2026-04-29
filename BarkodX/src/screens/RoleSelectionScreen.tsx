import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { setRole } from '../store/roleStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RoleSelection'>;

export const ROLES = [
  { id: 'admin', title: 'Admin (Tam Yetki)' },
  { id: 'personnel_1', title: 'Personel 1' },
  { id: 'personnel_2', title: 'Personel 2' },
  { id: 'personnel_3', title: 'Personel 3' },
  { id: 'personnel_4', title: 'Personel 4' },
  { id: 'personnel_5', title: 'Personel 5' },
  { id: 'personnel_6', title: 'Personel 6' },
  { id: 'personnel_7', title: 'Personel 7' },
  { id: 'personnel_8', title: 'Personel 8' },
  { id: 'personnel_9', title: 'Personel 9' },
];

export default function RoleSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleRoleSelect = async (roleId: string) => {
    await setRole(roleId);
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rolünüzü Seçin</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ROLES.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[styles.roleButton, role.id === 'admin' && styles.adminButton]}
            onPress={() => handleRoleSelect(role.id)}
          >
            <Text style={[styles.roleButtonText, role.id === 'admin' && styles.adminButtonText]}>
              {role.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  scrollContainer: {
    padding: 20,
    gap: 12,
  },
  roleButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  adminButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

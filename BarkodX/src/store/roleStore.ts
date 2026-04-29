import AsyncStorage from '@react-native-async-storage/async-storage';

const ROLE_KEY = '@BarkodX_UserRole';

export const setRole = async (role: string) => {
  try {
    await AsyncStorage.setItem(ROLE_KEY, role);
  } catch (error) {
    console.error('Error saving role:', error);
  }
};

export const getRole = async () => {
  try {
    const role = await AsyncStorage.getItem(ROLE_KEY);
    return role;
  } catch (error) {
    console.error('Error getting role:', error);
    return null;
  }
};

export const isAdmin = async () => {
  const role = await getRole();
  return role === 'admin';
};

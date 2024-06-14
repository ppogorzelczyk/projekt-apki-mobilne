import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = () => {
  const getValue = async (key: string): Promise<any> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting value from AsyncStorage:', error);
      return null;
    }
  };

  const setValue = async (key: string, value: any): Promise<void> => {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting value in AsyncStorage:', error);
    }
  };

  return { getValue, setValue };
};
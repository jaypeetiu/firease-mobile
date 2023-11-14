import AsyncStorage from '@react-native-async-storage/async-storage';
export const setLocalStorageItem = async (key, value, expiredInMinutes) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data stored successfully!');
  } catch (error) {
    console.log('Error storing data: ', error);
  }
};

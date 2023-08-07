import * as SecureStore from 'expo-secure-store';

export async function getData(key: string) {
    const result = await SecureStore.getItemAsync(key);
    return result ? true : false;
}
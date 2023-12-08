import * as SecureStore from 'expo-secure-store';

export async function deleteData() {
    await Promise.all([
        SecureStore.deleteItemAsync("email"),
        SecureStore.deleteItemAsync("pass"),
        SecureStore.deleteItemAsync("access_token")
    ])
}
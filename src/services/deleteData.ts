import * as SecureStore from 'expo-secure-store';

export async function deleteData() {
    // Refatorar dps (exGoHorse)

    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("pass");
    await SecureStore.deleteItemAsync("access_token");
}
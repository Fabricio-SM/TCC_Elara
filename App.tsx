import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { THEME } from './src/Themes';

export default function App() {
    return (
        <View style={styles.container}>
            <Image style={styles.image}
                source={require('elara-mobile/src/images/original.png')} />
            <View style={styles.divLogin}>
                <Text style={styles.label}>Login</Text>
                <TextInput style={styles.input}
                    placeholder='Username'
                />
                <Text style={styles.labelSenha}>Esqueci a senha</Text>
                <TextInput style={styles.input}
                    secureTextEntry={true}
                    placeholder='Password'
                />
                <Pressable
                    style={styles.button}
                    onPress={() => console.log("clicou")}>
                    <Text style={styles.textButton}>Entrar</Text>
                </Pressable>
            </View>
            <Text style={styles.text}>Não tem uma conta?</Text>
            <Text style={styles.text}>Cadastre-se</Text>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLORS.BACKGROUND,
        color: THEME.COLORS.TEXT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 200,
    },
    divLogin: {
        flexDirection: 'column',
        backgroundcolor: THEME.COLORS.MODAL_COLOR,
        width: 250,
        height: 300,
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        alignSelf: "center",
        backgroundColor: THEME.COLORS.INPUT_BACKGROUND,
        color: THEME.COLORS.TEXT,
        borderRadius: 7,
        padding: 10,
    },

    labelSenha: {
        color: THEME.COLORS.TEXT,
        marginTop: 10,
        textAlign: 'right',
        fontSize: 12,
    },

    label: {
        color: THEME.COLORS.TEXT,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },

    text: {
        color: THEME.COLORS.TEXT,
    },

    textButton: {
        marginTop: 6,
        color: THEME.COLORS.TEXT,
        textAlign: 'center',
        fontSize: 18,
    },

    button: {
        marginTop: 20,
        alignSelf: 'center',
        width: 100,
        height: 40,
        backgroundColor: THEME.COLORS.BUTTON_COLOR_LINK,
        borderRadius: 7,
    },

});

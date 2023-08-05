import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.image}
      source={require('elara-mobile/src/images/original.png')}/>
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
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250, 
    height: 200,
  },
  divLogin: {
    flexDirection: 'column',
    backgroundcolor: '#0000FF',
    width: 250,
    height: 300,
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    alignSelf: "center",
    backgroundColor:'#808080',
    borderRadius: 7,
    padding: 10,
  },

  labelSenha: {
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'right',
    fontSize: 12, 
  },

  label: {
    color: '#ffffff',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },

  text: {
    color: '#ffffff',
  },

  textButton: {
    marginTop: 6,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },

  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#4b0082',
    borderRadius: 7,
  },
  
});

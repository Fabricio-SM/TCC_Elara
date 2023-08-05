import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Cadastrar</Text>
            <Text style={styles.label2}>Nome</Text>
            <TextInput style={styles.input}/>
            <Text style={styles.label2}>E-mail</Text>
            <TextInput style={styles.input}
            inputMode="email"/>
            <Text style={styles.label2}>Confirmar E-mail</Text>
            <TextInput style={styles.input}
            inputMode="email"/>
            <Text style={styles.label2}>Data de Nascimento</Text>
            <TextInput style={styles.input}/>
            <Text style={styles.label2}>Senha</Text>
            <TextInput style={styles.input}
            secureTextEntry={true}/>
            <Text style={styles.label2}>Confirmar Senha</Text>
            <TextInput style={styles.input}
            secureTextEntry={true}/>
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
  
    label2: {
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
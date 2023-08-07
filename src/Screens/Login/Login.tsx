import React, { useState } from "react"
import axios from 'axios';
import { Pressable, View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

import { PlanetImage } from "../../Components/Image"
import { Input } from "../../Components/Input/Input"
import { style } from "./style"
import { Background } from "../../Components/Background/Background"
import { saveData } from "../../services/saveData";

interface UserData {
    email: string,
    password: string
}

export function Login() {
    const nav = useNavigation();
    const [errorMsg, setErrorMsg] = useState(false);
    

    async function handlePostApi({ email, password }: UserData): Promise<boolean> {
        try {
            const { data, status } = await axios.post('http://192.168.0.213:3000/auth', {
                email,
                "senha": password
            });
            
            if (status == 200) {
                await saveData('email', email);
                await saveData('pass', password);
                await saveData('token', data.access_token);

                return true;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    async function redirectScreen() {
        const data: UserData = {
            email: "gustavo@teste.com",
            password: "senha"
        }

        const apiReturn = await handlePostApi(data);
        
        if (apiReturn) {
            return nav.navigate("home");
        }

        setErrorMsg(true);
    }

    return (
        <Background>
            <SafeAreaView>
                <PlanetImage />
                <View style={style.divLogin}>
                    <Text style={style.label}>
                        Login
                    </Text>

                    {
                        errorMsg ? (
                            <Text style={style.errorMessage}>
                                Usuário/senha podem estar incorretos
                            </Text>
                        ) : null
                    }

                    <Input isPass={false} placeholder={'Email'} />

                    <Text style={style.labelSenha}>
                        Esqueci a senha
                    </Text>

                    <Input isPass={true} placeholder={'Senha'} />

                    <Pressable
                        style={style.button}
                        onPress={() => redirectScreen()}>
                        <Text style={style.textButton}>Entrar</Text>
                    </Pressable>
                </View>

                <Text style={style.text}>Não tem uma conta?</Text>
                <Text onPress={() => nav.navigate("cadastro")} style={style.actionText}>Cadastre-se</Text>
            </SafeAreaView>
        </Background>
    )
}

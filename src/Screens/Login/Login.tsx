import React from "react"
import { Pressable, View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

import { PlanetImage } from "../../Components/Image"
import { Input } from "../../Components/Input/Input"
import { style } from "./style"
import { Background } from "../../Components/Background/Background"


export function Login() {
    const nav = useNavigation();

    return (
        <Background>
            <SafeAreaView>
                <PlanetImage />
                <View style={style.divLogin}>
                    <Text style={style.label}>
                        Login
                    </Text>

                    <Input isPass={false} placeholder={'Username'} />

                    <Text style={style.labelSenha}>
                        Esqueci a senha
                    </Text>

                    <Input isPass={true} placeholder={'Password'} />

                    <Pressable
                        style={style.button}
                        onPress={() => nav.navigate("home")}>
                        <Text style={style.textButton}>Entrar</Text>
                    </Pressable>
                </View>

                <Text style={style.text}>Não tem uma conta?</Text>
                <Text onPress={() => nav.navigate("cadastro")} style={style.actionText}>Cadastre-se</Text>
            </SafeAreaView>
        </Background>
    )
}

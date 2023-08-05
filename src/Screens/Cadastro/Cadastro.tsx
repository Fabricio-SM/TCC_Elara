import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { style } from "./style";
import { Input } from "../../Components/Input/Input";
import { Background } from "../../Components/Background/Background";


export function Cadastro() {
    return (
        <Background>
            <SafeAreaView>
                <View>
                    <Text style={style.label}>Cadastrar</Text>

                    <Text style={style.label2}>Nome</Text>
                    <Input isPass={false} placeholder={"Nome"} />

                    <Text style={style.label2}>E-mail</Text>
                    <Input isPass={false} placeholder="Email" />

                    <Text style={style.label2}>Confirmar E-mail</Text>
                    <Input isPass={false} placeholder="" />

                    <Text style={style.label2}>Data de Nascimento</Text>
                    <Input isPass={false} placeholder={""} />

                    <Text style={style.label2}>Senha</Text>
                    <Input isPass={true} placeholder={"Senha"} />

                    <Text style={style.label2}>Confirmar Senha</Text>
                    <Input isPass={true} placeholder={"Senha"} />
                </View>
            </SafeAreaView>
        </Background>
    );
}


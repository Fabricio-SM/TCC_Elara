import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { style } from "./style";
import { Input } from "../../Components/Input/Input";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";
import { styleImg } from "../../Components/Image/style";


export function Cadastro() {
    return (
        <Background>
            <SafeAreaView style={style.view}>
                <View>
                    <Text style={style.label}>Cadastrar</Text>

                    <Text style={style.label2}>Nome</Text>
                    <Input placeholder={"Nome"} />

                    <Text style={style.label2}>E-mail</Text>
                    <Input placeholder={"E-mail"} />

                    <Text style={style.label2}>Confirmar E-mail</Text>
                    <Input placeholder={"Confirmar E-mail"} />

                    <Text style={style.label2}>Data de Nascimento</Text>
                    <Input placeholder={""} />

                    <Text style={style.label2}>Senha</Text>
                    <Input placeholder={"Senha"} />

                    <Text style={style.label2}>Confirmar Senha</Text>
                    <Input placeholder={"Confirmar Senha"} />
                </View>
            </SafeAreaView>
            <PlanetImage />
        </Background>
    );
}


import React, { useState } from "react";
import axios from 'axios';
import * as yup from "yup";
import { Pressable, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { PlanetImage } from "../../Components/Image";
import { Input } from "../../Components/Input/Input";
import { style } from "./style";
import { BackgroundWithoutPlanet } from "../../Components/BackgroundWithoutPlanet/BackgroundWithoutPlanet";
import { saveData } from "../../services/Storage/saveData";

type UserData = {
    email: string,
    password: string
}

const schema = yup.object({
    email: yup.string().required('Informe o email').email('Email inválido'),
    password: yup.string().required('Informe a senha')
});

export function Login() {
    const nav = useNavigation();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<UserData>({
        resolver: yupResolver(schema)
    });

    const [errorMsg, setErrorMsg] = useState(false);

    async function handlePostApi({ email, password }: UserData): Promise<boolean> {
        try {
            const { data, status } = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/auth`, {
                email,
                "senha": password
            });

            if (status == 200) {
                await Promise.all([
                    saveData('email', email),
                    saveData('pass', password),
                    saveData('access_token', data.access_token)
                ]);
                
                return true;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    async function onSubmit({ email, password }: UserData) {
        try {
            const body: UserData = {
                email,
                password: password
            }
    
            const apiReturn = await handlePostApi(body);
    
            if (apiReturn) {
                reset();
                return nav.navigate("home");
            }
    
            setErrorMsg(true);  
        } catch (error) {
            return Alert.alert("Um erro aconteceu", "Houve um erro ao procesar sua solicitacão, por favor tente novamente mais tarde");
        }

    }

    return (
        <BackgroundWithoutPlanet>
            <SafeAreaView>
                <PlanetImage />
                <View style={style.divLogin}>
                    <Text style={style.label}>
                        Login
                    </Text>

                    {
                        errorMsg ? (
                            <Text style={style.errorMessage}>
                                Email/senha podem estar incorretos
                            </Text>
                        ) : null
                    }

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <Input
                                textContentType="emailAddress"
                                placeholder="Email"
                                inputMode="email"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <View style={style.space}/>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input
                                placeholder="Senha"
                                textContentType="password"
                                onChangeText={onChange}
                                secureTextEntry
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Pressable style={style.button} onPress={handleSubmit(onSubmit)}>
                        {/* <Pressable style={style.button} onPress={() => nav.navigate("home")}> */}
                        <Text style={style.textButton}>Entrar</Text>
                    </Pressable>

                </View>

                <Text style={style.text}>Não tem uma conta?</Text>
                <Text onPress={() => nav.navigate("cadastro")} style={style.actionText}>Cadastre-se</Text>
            </SafeAreaView>
        </BackgroundWithoutPlanet>
    )
}

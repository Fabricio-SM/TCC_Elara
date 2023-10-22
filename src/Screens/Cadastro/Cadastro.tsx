import axios from "axios";
import * as yup from "yup";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from '@hookform/resolvers/yup';

import { style } from "./style";
import { Input } from "../../Components/Input/Input";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";

import { convertDateToString } from "../../utils/convertDate";

type RequestBody = {
    nome: string,
    email: string,
    dataNascimento: Date,
    senha: string
}

type FormProps = {
    name: string,
    email: string,
    emailConfirm: string,
    password: string,
    passConfirm: string
}

const schema = yup.object({
    name: yup.string().required('Informe o nome'),

    email: yup.string()
        .required('Informe o email')
        .email('Informe um email válido'),

    emailConfirm: yup.string()
        .required('Informe o email')
        .oneOf([yup.ref('email')], 'Email não é igual'),

    password: yup.string()
        .min(5, 'A senha deve ter no mínimo 5 caracteres')
        .max(8, 'A senha deve ter no máximo 8 caracteres')
        .required('Informe a senha'),

    passConfirm: yup.string()
        .required('Informe a confirmação da senha')
        .oneOf([yup.ref('password')], 'A senha não é igual'),
})

export function Cadastro() {
    const nav = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: yupResolver(schema)
    });

    const onChange = (selectedDate: any) => {
        setShow(false);

        const timeStampConverted = new Date(selectedDate.nativeEvent.timestamp);

        setDate(timeStampConverted);
    };

    async function onSubmit({ name, email, password }: FormProps) {
        try {
            const body: RequestBody = {
                nome: name,
                email: email,
                dataNascimento: date,
                senha: password
            }

            const { data, status } = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/user/add`, body)

            if (status == 201) {
                Alert.alert('Cadastro realizado com sucesso', 'Voltando a tela de login');
                return nav.navigate('login');
            }

            if (status == 400) {
                return Alert.alert("Email registrado", "Hmm, parece que esse email já possui uma conta");
            }


        } catch (error) {
            Alert.alert('Um erro ocorreu', 'Tente novamente mais tarde');
            return nav.navigate('login');
        }
    }

    return (
        <Background>
            <SafeAreaView style={style.view}>
                <View>
                    <Text style={style.label}>Cadastrar</Text>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Nome"
                                textContentType="name"
                                placeholder="Nome"
                                inputMode="text"
                                onChangeText={onChange}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Email"
                                textContentType="emailAddress"
                                placeholder="Email"
                                inputMode="email"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="emailConfirm"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Confirmar Email"
                                textContentType="emailAddress"
                                placeholder="Confirmar Email"
                                inputMode="email"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                errorMessage={errors.emailConfirm?.message}
                            />
                        )}
                    />

                    <Input showSoftInputOnFocus={false} labelValue="Data de nascimento" defaultValue={convertDateToString(date)} onPressIn={() => setShow(true)} />
                    {
                        show &&
                        <DateTimePicker
                            testID="datePicker"
                            value={date}
                            mode="date"
                            onChange={onChange}
                        />
                    }

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Senha"
                                placeholder="Senha"
                                textContentType="password"
                                onChangeText={onChange}
                                secureTextEntry
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="passConfirm"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Confirmar senha"
                                placeholder="Confirmar Senha"
                                textContentType="password"
                                onChangeText={onChange}
                                secureTextEntry
                                errorMessage={errors.passConfirm?.message}
                            />
                        )}
                    />

                    <View style={style.rowView}>
                        <Pressable style={style.button} onPress={handleSubmit(onSubmit)}>
                            <Text style={style.textButton}>Salvar</Text>
                        </Pressable>

                        <Pressable style={style.button2} onPress={() => { nav.goBack() }}>
                            <Text style={style.textButton}>Cancelar</Text>
                        </Pressable>
                    </View>

                    <View style={{ opacity: 0.5 }}>
                        <PlanetImage />
                    </View>
                </View>
            </SafeAreaView>
        </Background>
    );
}


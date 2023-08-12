import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from 'react-hook-form'
import { useNavigation } from "@react-navigation/native";

import { style } from "./style";
import { Input } from "../../Components/Input/Input";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";

import { convertDateToString } from "../../utils/convertDate";
import axios from "axios";

interface RequestBody {
    nome: string,
    email: string,
    dataNascimento: Date,
    senha: string
}

export function Cadastro() {
    const nav = useNavigation();
    const [date, setDate] = useState(new Date());
    const { register, setValue, handleSubmit } = useForm();
    const [show, setShow] = useState(false);

    const onChange = (selectedDate: any) => {
        setShow(false);

        const timeStampConverted = new Date(selectedDate.nativeEvent.timestamp);

        setDate(timeStampConverted);
    };

    useEffect(() => {
        register('name')
        register('email')
        register('emailConfirm')
        register('password')
        register('passConfirm')
    }, [register])

    async function onSubmit(formData: any) {
        try {
            const body: RequestBody = {
                nome: formData.name,
                email: formData.email,
                dataNascimento: date,
                senha: formData.password
            }

            const { data, status } = await axios.post('http://192.168.0.213:3000/user/add', body)

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

                    <Text style={style.label2}>Nome</Text>
                    <Input textContentType="name"
                        placeholder="Nome"
                        inputMode="text"
                        onChangeText={newText => setValue('name', newText)}
                    />

                    <Text style={style.label2}>E-mail</Text>
                    <Input
                        textContentType="emailAddress"
                        placeholder="Email"
                        inputMode="email"
                        keyboardType="email-address"
                        onChangeText={newText => setValue('email', newText)}
                    />

                    <Text style={style.label2}>Confirmar E-mail</Text>
                    <Input textContentType="emailAddress"
                        placeholder="Confirmar Email"
                        inputMode="email"
                        keyboardType="email-address"
                        onChangeText={newText => setValue('emailConfirm', newText)}
                    />

                    <Text style={style.label2}>Data de Nascimento</Text>
                    <Input defaultValue={convertDateToString(date)} onPressIn={() => setShow(true)} />
                    {
                        show &&
                        <DateTimePicker
                            testID="datePicker"
                            value={date}
                            mode="date"
                            onChange={onChange}
                        />
                    }

                    <Text style={style.label2}>Senha</Text>
                    <Input
                        placeholder="Senha"
                        textContentType="password"
                        onChangeText={newText => setValue('password', newText)}
                        secureTextEntry={true} />

                    <Text style={style.label2}>Confirmar Senha</Text>
                    <Input placeholder="Confirmar Senha"
                        textContentType="password"
                        onChangeText={newText => setValue('passConfirm', newText)}
                        secureTextEntry={true} />

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


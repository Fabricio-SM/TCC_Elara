import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { style } from "./style";
import { Input } from "../../Components/Input/Input";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";



export function Cadastro() {
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    return (
        <Background>
            <SafeAreaView style={style.view}>
                <View>
                    <Text style={style.label}>Cadastrar</Text>

                    <Text style={style.label2}>Nome</Text>
                    <Input textContentType="name"
                        placeholder="Nome"
                        inputMode="text"
                    //onChangeText={newText => setEmail(newText)}
                    //defaultValue={email} 
                    />

                    <Text style={style.label2}>E-mail</Text>
                    <Input
                        textContentType="emailAddress"
                        placeholder="Email"
                        inputMode="email"
                        keyboardType="email-address"
                    //onChangeText={newText => setEmail(newText)}
                    //defaultValue={email}
                    />

                    <Text style={style.label2}>Confirmar E-mail</Text>
                    <Input textContentType="emailAddress"
                        placeholder="Confirmar Email"
                        inputMode="email"
                        keyboardType="email-address"
                    //onChangeText={newText => setEmail(newText)}
                    //defaultValue={email}
                    />

                    <Text style={style.label2}>Data de Nascimento</Text>
                    <Input value={date.toISOString()} onPressIn={() => setShow(true)} />
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
                    <Input placeholder="Senha"
                        textContentType="password"
                        //onChangeText={newText => setPass(newText)}
                        //defaultValue={pass}
                        secureTextEntry={true} />

                    <Text style={style.label2}>Confirmar Senha</Text>
                    <Input placeholder="Confirmar Senha"
                        textContentType="password"
                        //onChangeText={newText => setPass(newText)}
                        //defaultValue={pass}
                        secureTextEntry={true} />

                    <View style={style.rowView}>
                        <Pressable style={style.button} onPress={() => { }}>
                            <Text style={style.textButton}>Salvar</Text>
                        </Pressable>

                        <Pressable style={style.button2} onPress={() => { }}>
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


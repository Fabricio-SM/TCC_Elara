import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';


import { style } from "./style";
import { Input } from "../../Components/Input/Input";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";
import { styleImg } from "../../Components/Image/style";


export function Perfil() {
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
                    <Text style={style.label}>Perfil</Text>

                    <Text style={style.label2}>Nome</Text>
                    <Input textContentType="name"
                        placeholder="Nome"
                        inputMode="text"
                        autoComplete="name"
                        //onChangeText={newText => setEmail(newText)}
                        //defaultValue={email} 
                        />

                    <Text style={style.label2}>E-mail</Text>
                    <Input textContentType="emailAddress"
                        placeholder="Email"
                        inputMode="email"
                        keyboardType="email-address"
                        autoComplete="email"
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

                    <View style={style.rowView}>

                        <Text style={style.text}>Excluir histórico de fala</Text>
                        
                        <Pressable style={style.button2} onPress={() => {}}>
                            <Text style={style.textButton}>Excluir</Text>
                        </Pressable>
                    </View>

                    <Pressable style={style.button} onPress={() => {}}>
                        <Text style={style.textButton}>Salvar</Text>
                    </Pressable>

                    <View style={{ opacity: 0.5 }}>
                        <PlanetImage />
                    </View>
                </View>
            </SafeAreaView>  
        </Background>
    );
}


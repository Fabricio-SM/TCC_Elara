import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from 'react-native-elements'

import { useNavigation } from "@react-navigation/native";
import { style } from "./style";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";

export function Lista() {
    const nav = useNavigation();

    return (
        <Background>
            <SafeAreaView style={style.view}>
                <View>
                    <View style={style.rowView}>

                        <Text style={style.label}>Lista 01</Text> 

                        <Pressable>
                            <Icon color='#ffffff' name="pen" type="material-community" onPress={() => nav.navigate("configs")}/>
                        </Pressable>
                        
                    </View>
                    <View style={style.hr}/>
                    <View style={style.rowView}></View>
                    <View style={style.rowView}></View>



                    <View style={style.hr}/>
                    <View style={style.rowView}>
                        <Text style={style.text}>Excluir lista</Text>

                        <Pressable style={style.button2} onPress={() => {}}>
                            <Text style={style.textButton}>Excluir</Text>
                        </Pressable>
                    </View>

                    <View>
                        <Pressable style={style.button} onPress={() => {}}>
                            <Text style={style.textButton}>Salvar</Text>
                        </Pressable>

                        <Pressable style={style.button2} onPress={() => {}}>
                            <Text style={style.textButton}>Cancelar</Text>
                        </Pressable>
                    </View>
                
                </View>
                <View style={{ opacity: 0.5 }}>
                    <PlanetImage />
                </View>
            </SafeAreaView>  
        </Background>
    );
}
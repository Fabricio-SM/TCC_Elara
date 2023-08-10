import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from 'react-native-elements'

import { useNavigation } from "@react-navigation/native";
import { style } from "./style";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";


export function Sobre() {
    const nav = useNavigation();

    return (
        <Background>
            <SafeAreaView style={style.view}>
                <View>
                    <View style={style.rowView}>
                        <Pressable>
                            <Icon color='#ffffff' name="arrow-left-bold" type="material-community" onPress={() => nav.navigate("configs")}/>
                        </Pressable>

                        <Text style={style.label}>Sobre</Text>

                        <View></View>
                        
                    </View>
                    <View style={style.hr}/>

                    <Text style={style.text}>
                    Elara é uma assistente virtual criada para auxiliar pessoas em pequenas tarefas
                    </Text>
                    <View style={style.body}></View>
                    
                </View>
                <View style={{ opacity: 0.5 }}>
                    <PlanetImage />
                </View>
            </SafeAreaView>  
        </Background>
    );
}

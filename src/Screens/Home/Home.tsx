import React from "react";
import { Text, View, Pressable } from "react-native";
import { Background } from "../../Components/Background/Background";
import { THEME } from "../../Themes";
import { deleteData } from "../../services/deleteData";
import { useNavigation } from "@react-navigation/native";
import { style } from "./style"
import { Icon } from 'react-native-elements'
import { PlanetImage } from "../../Components/Image";

export function Home() {
    const nav = useNavigation(); // Temporariamente para os testes;

    return (
        <Background>
            <View style={style.view}>
                {/* onPress temporariamente para testes */}
                <View style={style.rowView}>
                    <Text style={style.label}>Elara</Text>

                    <Pressable>
                        <Icon color='#851397'size={40} name="settings"  onPress={() => nav.navigate("configs")}/>
                    </Pressable>
                </View>
                <View style={style.hr}/>

                {/* <View></View> espaçamento  */}

                <View style={{ opacity: 0.5 }}>
                    <PlanetImage />
                </View>

                <Pressable>
                    <Icon color='#851397' size={80} name="microphone" type="material-community" onPress={() => {}}/>
                </Pressable>

                <View style={style.rowView2}>
                    <Pressable>
                        <Icon color='#ffffff'size={30} name="clock-time-three-outline" type="material-community" onPress={() => {}}/>
                    </Pressable>
                    <Icon color='#851397'size={40} name="settings"  onPress={() => nav.navigate("lista")}/>
                    <Pressable>
                        <Icon color='#ffffff' size={30} name="help-circle-outline" type="material-community" onPress={() => {}}/>
                    </Pressable>
                </View>

                <View style={style.view2}></View>

            </View>
        </Background>
    );
}
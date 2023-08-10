import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from 'react-native-elements'

import { useNavigation } from "@react-navigation/native";
import { style } from "./style";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";
import ToggleSwitch from 'toggle-switch-react-native';


export function Permissoes() {
    const nav = useNavigation();

    return (
        <Background>
            <SafeAreaView style={style.view}>
                <View>
                    <View style={style.rowView}>
                        <Pressable>
                            <Icon color='#ffffff' name="arrow-left-bold" type="material-community" onPress={() => nav.navigate("configs")}/>
                        </Pressable>

                        <Text style={style.label}>Permissões</Text>

                        <View></View>
                    </View>
                    <View style={style.hr}/>

                    <View style={style.body}>

                        <View style={style.rowView}>
                            <Text style={style.text}>Enviar notificações</Text>
                            <ToggleSwitch // componente 
                                isOn={false}
                                onColor="green"
                                offColor="white"
                                size="small"
                                onToggle={isOn => console.log("changed to : ", isOn)}
                            />
                        </View>

                        <View style={style.rowView}>
                            <Text style={style.text}>Acesso ao microfone</Text>
                            <ToggleSwitch 
                                
                                isOn={false}
                                onColor="green"
                                offColor="white"
                                size="medium"
                                onToggle={isOn => console.log("changed to : ", isOn)}
                            />
                        </View>

                        <View style={style.rowView}>
                            <Text style={style.text}>Sobrepor aplicativos</Text>
                            <ToggleSwitch 
                                isOn={false}
                                onColor="green"
                                offColor="white"
                                size="medium"
                                onToggle={isOn => console.log("changed to : ", isOn)}
                            />
                        </View>

                    </View>
                    
                </View>
                <View style={{ opacity: 0.5 }}>
                    <PlanetImage />
                </View>
            </SafeAreaView>  
        </Background>
    );
}


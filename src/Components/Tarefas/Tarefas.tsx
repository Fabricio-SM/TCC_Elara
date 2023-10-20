import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { style } from "./style";
import { Icon } from "react-native-elements";
import { convertDateToString } from "../../utils/convertDate";
import Checkbox from "expo-checkbox";

interface TarefaProps {
    nomeTarefa: string;
    dataEntrega: Date;
    concluida: boolean;
}

export function Tarefas(props: TarefaProps) {
    return (
        <View>
            <View style={style.hr} />
            <View style={style.rowView}>
                <View style={style.rowView2}>
                    <Checkbox
                        style={style.icon}
                        value={props.concluida}
                        color={props.concluida ? "#4630EB" : undefined}
                        onChange={() => {}}
                    />
                    <View style={style.space}></View>
                    <View style={style.colView}>
                        <Text style={style.labeltext}>{props.nomeTarefa}</Text>
                        {
                            props.dataEntrega != null
                                ? <Text style={style.labelTextSub}>Data de entrega: {convertDateToString(props.dataEntrega)}</Text>
                                : <Text style={style.labelTextSub}>Data de entrega: 16/05/2003</Text>
                        }
                    </View>
                </View>

                <View style={style.rowView2}>
                    <Pressable style={style.icon}>
                        <Icon
                            size={32}
                            color="#ffffff"
                            name="pen"
                            type="material-community"
                            onPress={() => { }}
                        />
                    </Pressable>
                    <View style={style.space}></View>
                    <Pressable style={style.icon}>
                        <Icon
                            size={32}
                            color="#ffffff"
                            name="trash-can"
                            type="material-community"
                            onPress={() => { }}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

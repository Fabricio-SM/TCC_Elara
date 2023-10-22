import React, { useState } from "react";
import { ImageBackground, Pressable, View, Text } from "react-native";
import { style } from "./style";
import Checkbox from "expo-checkbox";
import Icon from "react-native-elements/dist/icons/Icon";
import { convertDateToString } from "../../utils/convertDate";

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
        <Checkbox
          style={style.icon}
          value={props.concluida}
          color={props.concluida ? "#4630EB" : undefined}
        />
        <View style={style.colView}>
          <Text style={style.labeltext}>{props.nomeTarefa}</Text>
          <Text style={style.labeltext}>Data entrega: {convertDateToString(props.dataEntrega)}</Text>
        </View>

        <Pressable style={style.icon}>
          <Icon
            color="#ffffff"
            name="pen"
            type="material-community"
            onPress={() => {}}
          />
        </Pressable>

        <Pressable style={style.icon}>
          <Icon
            color="#ffffff"
            name="trash-can"
            type="material-community"
            onPress={() => {}}
          />
        </Pressable>
      </View>
    </View>
  );
}

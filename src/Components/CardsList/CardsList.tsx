import React from "react";
import { Pressable, Text, View } from "react-native";
import { style } from "./style";
import { useNavigation } from "@react-navigation/native";

interface CardsProps {
  title: string;
  subTitle: string;
}

export function CardsList({ title, subTitle }: CardsProps) {
  const nav = useNavigation();

  return (
    <Pressable
      onPress={() =>
        nav.navigate("lista", {
          nomeLista: title,
        })
      }
    >
      <Text style={style.title}>{title}</Text>
      <Text style={style.subtitle}>{subTitle}</Text>
      <View style={style.hr}></View>
    </Pressable>
  );
}

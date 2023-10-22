import React from "react";
import { Text, View } from "react-native";
import { style } from "./style";

interface CardsProps {
    title: string;
    subTitle: string;
}

export function Cards({ title, subTitle }: CardsProps) {
    return (
        <View>
            <Text style={style.title}>{title}</Text>
            <Text style={style.subtitle}>{subTitle}</Text>
            <View style={style.hr}></View>
        </View>
        );
};
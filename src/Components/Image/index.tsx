import React from "react";
import planetImg from '../../assets/original.png'
import { ImageBackground } from "react-native";
import { style } from "./style";

export function PlanetImage() {
    return (
        <ImageBackground
            source={planetImg}
            defaultSource={planetImg}
            style={style.image}
        >
        </ImageBackground>
    );
}
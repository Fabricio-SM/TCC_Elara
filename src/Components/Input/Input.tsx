import React from "react";
import { TextInput } from "react-native";
import { style } from "./style";
import { THEME } from "../../Themes";

interface Props {
    isPass: boolean;
    placeholder: string;
}

export function Input(props: Props) {
    return (
        <TextInput 
            style={style.input}
            secureTextEntry={props.isPass} 
            placeholder={props.placeholder}
            placeholderTextColor={THEME.COLORS.PLACEHOLDER}
        />
    );
}
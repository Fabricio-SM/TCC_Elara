import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { style } from "./style";
import { THEME } from "../../Themes";

export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput style={style.input} placeholderTextColor={THEME.COLORS.PLACEHOLDER} {...rest} />
    );
}
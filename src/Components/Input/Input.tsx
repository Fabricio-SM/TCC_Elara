import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { style } from "./style";
import { THEME } from "../../Themes";

type Props = TextInputProps & {
    labelValue?: string
    errorMessage?: string
}

export function Input({ labelValue, errorMessage, ...rest }: Props) {
    return (
        <View>
            {
                labelValue && <Text style={style.label}>{labelValue}</Text>
            }
            <TextInput style={[style.input, errorMessage ? style.inputError : style.input]} placeholderTextColor={THEME.COLORS.PLACEHOLDER} {...rest} />
            {
                errorMessage && <Text style={style.textError}>
                    {errorMessage}
                </Text>
            }
        </View>
    );
}
import React, { useState } from "react";
import { TextInput } from "react-native";
import { style } from "./style";
import { THEME } from "../../Themes";

interface Props {
    isPass: boolean;
    placeholder: string;
}

export function Input(props: Props) {
    const [text, setText] = useState('');
    
    return (
        <TextInput 
            style={style.input}
            secureTextEntry={props.isPass} 
            placeholder={props.placeholder}
            placeholderTextColor={THEME.COLORS.PLACEHOLDER}
            onChangeText={newText => setText(newText)}
            defaultValue={text}
        />
    );
}
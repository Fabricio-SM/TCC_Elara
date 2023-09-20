import React, { useState } from 'react';
import { ImageBackground, Pressable, View } from 'react-native';
import { style } from './style';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-elements/dist/icons/Icon';

export function Tarefas() {
    const [isChecked, setChecked] = useState(false);
    return (
        <View>
            <View style={style.hr}/>
            <View style={style.rowView}>
                <Checkbox
                style={style.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
                />
                <View style={style.colView}>
                    {/* <Text style={style.labeltext}></Text>
                    <Text style={style.labeltext}></Text> */}
                </View>

                <Pressable>
                    <Icon color="#ffffff" name="pen" type="material-community" onPress={() => {}} />
                </Pressable>

                <Pressable>
                    <Icon color="#ffffff" name="trash-can" type="material-community" onPress={() => {}} />
                </Pressable>
            </View>
        </View>
    );
}
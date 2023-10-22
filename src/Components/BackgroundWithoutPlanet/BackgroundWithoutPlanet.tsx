import React from 'react';
import { View } from 'react-native';
import { style } from './style';

interface Props {
    children: React.ReactNode;
}

export function BackgroundWithoutPlanet({children}: Props) {
    return (
        <View style={style.container}> 
            {children} 
        </View>
    );
}
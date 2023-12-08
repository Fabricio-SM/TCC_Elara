import React from 'react';
import { View } from 'react-native';
import { style } from './style';
import { PlanetImage } from '../Image';

interface Props {
    children: React.ReactNode;
}

export function Background({ children }: Props) {
    return (
        <View style={style.container}>
            {children}


            <View style={{ opacity: 0.5 }}>
                <PlanetImage />
            </View>
        </View>
    );
}
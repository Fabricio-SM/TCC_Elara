import React from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import { style } from './style';

interface Props {
    children: React.ReactNode;
}

export function Background({children}: Props) {
    return (
        <SafeAreaView style={style.container}> 
            {children} 
        </SafeAreaView>
    );
}
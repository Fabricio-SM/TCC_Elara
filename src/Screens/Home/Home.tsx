import React from "react";
import { Text, View } from "react-native";
import { Background } from "../../Components/Background/Background";
import { THEME } from "../../Themes";

export function Home() {
    return (
        <Background>
            <View>
                <Text style={{ color: THEME.COLORS.TEXT }}>Teste</Text>
            </View>
        </Background>
    );
}
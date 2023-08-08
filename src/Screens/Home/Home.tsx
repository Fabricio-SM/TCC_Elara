import React from "react";
import { Text, View } from "react-native";
import { Background } from "../../Components/Background/Background";
import { THEME } from "../../Themes";
import { deleteData } from "../../services/deleteData";
import { useNavigation } from "@react-navigation/native";

export function Home() {
    const nav = useNavigation(); // Temporariamente para os testes;

    return (
        <Background>
            <View>
                {/* onPress temporariamente para testes */}

                <Text onPress={() => {
                    deleteData();
                    nav.navigate("login")
                }} style={{ color: THEME.COLORS.TEXT }}>Teste</Text>
            </View>
        </Background>
    );
}
import React from "react";
import { Text, View, Pressable } from "react-native";
import { Background } from "../../Components/Background/Background";
import { THEME } from "../../Themes";
import { deleteData } from "../../services/deleteData";
import { useNavigation } from "@react-navigation/native";
import { style } from "./style"

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

                {/* Pressable somente para testes */}

                <Pressable style={style.button} onPress={() => nav.navigate("perfil")}>
                    <Text style={style.textButton}>A</Text>
                </Pressable>

                <Pressable style={style.button} onPress={() => nav.navigate("configs")}>
                    <Text style={style.textButton}>C</Text>
                </Pressable>
            </View>
        </Background>
    );
}
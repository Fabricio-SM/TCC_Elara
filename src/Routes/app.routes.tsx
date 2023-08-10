import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../Screens/Login/Login";
import { Cadastro } from "../Screens/Cadastro/Cadastro";
import { Perfil } from "../Screens/Perfil/Perfil";
import { Config } from "../Screens/Configs/Configs";
import { Permissoes } from "../Screens/Permissoes/Permissoes";
import { Sobre } from "../Screens/Sobre/Sobre";
import { Home } from "../Screens/Home/Home";
import { getData } from "../services/getData";

const Stack = createNativeStackNavigator();

export function AppRoutes() {
    const [defaultScreen, setDefaultScreen] = useState("login");
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkEmail() {

            let hasData = await getData("email");
            
            if (hasData) {
                setDefaultScreen("home");
            }

            setLoading(false);
        }

        checkEmail();
    }, []);

    if (loading) {
        // Pode exibir uma tela de carregamento aqui, se necessário.
        return null;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={defaultScreen}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="cadastro" component={Cadastro} />
            <Stack.Screen name="perfil" component={Perfil} />
            <Stack.Screen name="configs" component={Config} />
            <Stack.Screen name="permissoes" component={Permissoes} />
            <Stack.Screen name="sobre" component={Sobre} />
        </Stack.Navigator>
    );
}
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../Screens/Login/Login";
import { Cadastro } from "../Screens/Cadastro/Cadastro";
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
        </Stack.Navigator>
    );
}
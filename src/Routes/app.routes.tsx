import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../Screens/Login/Login";
import { Cadastro } from "../Screens/Cadastro/Cadastro";
import { Home } from "../Screens/Home/Home";


const Stack = createNativeStackNavigator()

export function AppRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="home" component={Home} /> */}
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="cadastro" component={Cadastro} />
        </Stack.Navigator>
    );
}
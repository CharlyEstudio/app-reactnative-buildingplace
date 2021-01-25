import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Negocios from "../../screens/Negocios";

const Stack = createStackNavigator();

export default function NegociosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="negocios"
                component={Negocios}
                options={{ title: "Negocios" }}
            />
        </Stack.Navigator>
    )
}

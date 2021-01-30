import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TopNegocios from "../../screens/TopNegocios";

const Stack = createStackNavigator();

export default function TopNegociosStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="top-negocios"
                component={TopNegocios}
                options={{ title: "Los Mejores Negocios" }}
            />
        </Stack.Navigator>
    )
}

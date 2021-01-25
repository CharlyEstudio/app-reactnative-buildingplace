import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SalesOrder from "../../screens/SalesOrder";

const Stack = createStackNavigator();

export default function SalesOrderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="sales-order"
                component={SalesOrder}
                options={{ title: "Mis Pedidos" }}
            />
        </Stack.Navigator>
    )
}

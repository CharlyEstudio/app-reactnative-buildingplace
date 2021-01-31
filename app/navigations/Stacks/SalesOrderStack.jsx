import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

// Page
import SalesOrder from "../../screens/SalesOrder/SalesOrder";

// Stacks
import AddSalesOrder from '../../screens/SalesOrder/AddSalesOrder';

const Stack = createStackNavigator();

export default function SalesOrderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="sales-order"
                component={SalesOrder}
                options={{ title: "Mis Pedidos" }}
            />
            <Stack.Screen
                name="add-sales-order"
                component={AddSalesOrder}
                options={{ title: "Nueva Orden" }}
            />
        </Stack.Navigator>
    )
}

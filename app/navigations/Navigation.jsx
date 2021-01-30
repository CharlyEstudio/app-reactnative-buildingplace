import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';

// Stacks
import NegociosStack from "./Stacks/NegociosStack";
import SalesOrderStack from "./Stacks/SalesOrderStack";
import TopNegociosStack from "./Stacks/TopNegociosStack";
import SearchStack from "./Stacks/SearchStack";
import AccountStack from "./Stacks/AccountStack";

const Tab = createBottomTabNavigator();

export default function navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="negocios"
                tabBarOptions={{ inactiveTintColor: "#646464", activeTintColor: "#00a680" }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="negocios"
                    component={NegociosStack}
                    options={{ title: "Negocios" }}
                />
                <Tab.Screen
                    name="sales-order"
                    component={SalesOrderStack}
                    options={{ title: "Mis Pedidos" }}
                />
                <Tab.Screen
                    name="top-negocios"
                    component={TopNegociosStack}
                    options={{ title: "Top 5" }}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ title: "Cuenta" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color) {
    let iconName;

    switch (route.name) {
        case 'negocios':
            iconName = "compass-outline"
            break;
        case 'sales-order':
            iconName = "heart-outline"
            break;
        case 'top-negocios':
            iconName = "star-outline"
            break;
        case 'search':
            iconName = "magnify"
            break;
        case 'account':
            iconName = "home-outline"
            break;
        default:
            break;
    }

    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    );
}
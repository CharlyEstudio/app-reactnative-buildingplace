import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Firebase
import * as firebase from 'firebase';

export default function UserLogged() {
    return (
        <View>
            <Text>User Logged</Text>
            <Button
                title="Cerrar Sesión"
                onPress={() => firebase.auth().signOut()}
            />
        </View>
    );
}

const styles = StyleSheet.create({});

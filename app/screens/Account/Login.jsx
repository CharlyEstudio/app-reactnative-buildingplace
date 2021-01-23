import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// Components
import ToastGlobal from '../../components/ToastGlobal';
import LoginForm from '../../components/Account/LoginForm';

export default function Login() {
    const toastRef = useRef();

    return (
        <ScrollView>
            <Image
                source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} />
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
            <Text>Social Login</Text>
            <ToastGlobal toastRef={toastRef} />
        </ScrollView>
    )
}

function CreateAccount() {
    const navigation = useNavigation();

    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{' '}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate('register')}
            >
                Regístrate
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    divider: {
        backgroundColor: '#00a680',
        margin: 40
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    btnRegister: {
        color: '#00a680',
        fontWeight: 'bold'
    }
});

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

// Firebase
import * as firebase from 'firebase';

// Validations
import { validateEmail } from '../../utils/validations';

// API
import { reauthenticate } from '../../utils/api';

export default function ChangeEmailForm({title, email, setShowModal, toastRef, setReloadUserInfo}) {
    const [formData, setFormData] = useState(defaultValue(email));
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    const onChange = (e, type) => {
        setFormData({
            ...formData,
             [type]: e.nativeEvent.text
        });
    };

    const onSubmit = async () => {
        setError({});
        if (!formData.email || email === formData.email) {
            setError({
                email: 'El email no ha cambiado'
            });
        } else if (!validateEmail(formData.email)) {
            setError({
                email: 'Email incorrecto'
            });
        } else if (!formData.password) {
            setError({
                password: 'La contraseña no puede estar vacia'
            });
        } else {
            setIsLoading(true);
            try {
                await reauthenticate(formData.password);
                try {
                    await firebase
                        .auth()
                        .currentUser
                        .updateEmail(formData.email);
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    toastRef.current.show('Email actualizado correctamente');
                    setShowModal(false);
                } catch (er) {
                    setIsLoading(false);
                    console.log('ChangeEmailForm::updateEmail', er);
                    toastRef.current.show('Error al actualizar el email');
                }
            } catch (e) {
                console.log('ChangeEmailForm::reauthenticate', e);
                setIsLoading(false);
                setError({
                    password: 'La contraseña no es correcta'
                });
            }
        }
    };

    return (
        <View style={styles.view}>
            <Text style={styles.title}>{title}</Text>
            <Input
                placeholder="Nuevo Email"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: '#c2c2c2'
                }}
                defaultValue={email && email}
                onChange={e => onChange(e, 'email')}
                errorMessage={error.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={e => onChange(e, 'password')}
                errorMessage={error.password}
            />
            <Text style={styles.message}>Para cambiar el email es necesario colocar el password de su cuenta para realizar la actualización.</Text>
            <Button
                title={title}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

function defaultValue(email) {
    return {
        email: email,
        password: ''
    };
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20
    },
    input: {
        marginBottom: 10
    },
    message: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10
    },
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a860'
    }
})

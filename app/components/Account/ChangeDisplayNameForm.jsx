import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

// Firebase
import * as firebase from 'firebase';

export default function ChangeDisplayNameForm({title, displayName, setShowModal, toastRef, setReloadUserInfo}) {
    const [newDisplayName, setNewDisplayName] = useState(displayName ? displayName : null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        setError(null);
        if (!newDisplayName) {
            setError('El nombre no puede estar vacío');
        } else if (displayName === newDisplayName) {
            setError('El nombre no puede ser igual al actual');
        } else {
            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            };

            try {
                await firebase
                    .auth()
                    .currentUser
                    .updateProfile(update);
                setIsLoading(false);
                setReloadUserInfo(true);
                setShowModal(false);
                toastRef.current.show('Datos de usuario actualizado');
            } catch (e) {
                console.log('ChangeDisplayNameForm::updateProfile', e);
                setIsLoading(false);
                toastRef.current.show(e);
                setShowModal(true);
                setError(e);
            }
        }
    };

    return (
        <View style={styles.view}>
            <Text style={styles.title}>{title}</Text>
            <Input
                placeholder="Nombre y apellidos"
                containerStyle={styles.input}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: '#c2c2c2'
                }}
                defaultValue={displayName && displayName}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
            />
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
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a860'
    }
})

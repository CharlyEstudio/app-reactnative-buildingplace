import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { size } from 'lodash';

// Firebase
import * as firebase from 'firebase';

// API
import { reauthenticate } from '../../utils/api';

export default function ChangePasswordForm({title, password, setShowModal, toastRef}) {
    const [showPasswordNow, setShowPasswordNow] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewRepeatPassword, setShowNewRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.nativeEvent.text
        });
    };

    const onSubmit = async () => {
        let isSetError = true;
        let errorTemp = {};
        setError({});
        if (!formData.password || !formData.newPassword || !formData.repeatNewPassword) {
            errorTemp = {
                password: !formData.password ? 'La contraseña no puede estar vacia' : '',
                newPassword: !formData.newPassword ? 'La nueva contraseña no puede estar vacia' : '',
                repeatNewPassword: !formData.repeatNewPassword ? 'La nueva contraseña repetida no puede estar vacia' : ''
            };
        } else if (formData.newPassword !== formData.repeatNewPassword) {
            errorTemp = {
                newPassword: 'Las contraseñas no son iguales',
                repeatNewPassword: 'Las contraseñas no son iguales'
            };
        } else if (size(formData.newPassword) < 6) {
            errorTemp = {
                newPassword: 'Las contraseñas tienen que se mayor a 5 caracteres',
                repeatNewPassword: 'Las contraseñas tienen que se mayor a 5 caracteres'
            };
        } else {
            setIsLoading(true);
            try {
                await reauthenticate(formData.password);
                try {
                    await firebase
                    .auth()
                    .currentUser
                    .updatePassword(formData.newPassword);
                    setIsLoading(false);
                    setShowModal(false);
                    isSetError = false;
                    firebase.auth().signOut();
                } catch (err) {
                    console.log('ChangePasswordForm::updatePassword', e);
                    errorTemp = {
                        other: 'Error al actualizar la contraseña'
                    };
                    setIsLoading(false);
                    setShowModal(false);
                }
            } catch (e) {
                console.log('ChangePasswordForm::reauthenticate', e);
                setIsLoading(false);
                errorTemp = {
                    password: e
                };
            }
        }
        isSetError && setError(errorTemp);
    };

    return (
        <View style={styles.view}>
            <Text style={styles.title}>{title}</Text>
            <Input
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showPasswordNow ? false : true}
                rightIcon={{
                    type: 'material-community',
                    name: showPasswordNow ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPasswordNow(!showPasswordNow)
                }}
                defaultValue={formData.password}
                onChange={e => onChange(e, 'password')}
                errorMessage={error.password}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showNewPassword ? false : true}
                rightIcon={{
                    type: 'material-community',
                    name: showNewPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowNewPassword(!showNewPassword)
                }}
                defaultValue={formData.newPassword}
                onChange={e => onChange(e, 'newPassword')}
                errorMessage={error.newPassword}
            />
            <Input
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={showNewRepeatPassword ? false : true}
                rightIcon={{
                    type: 'material-community',
                    name: showNewRepeatPassword ? 'eye-off-outline' : 'eye-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowNewRepeatPassword(!showNewRepeatPassword)
                }}
                defaultValue={formData.repeatNewPassword}
                onChange={e => onChange(e, 'repeatNewPassword')}
                errorMessage={error.repeatNewPassword}
            />
            <Button
                title={title}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            {
                error.other &&
                <Text>{error.other}</Text>
            }
        </View>
    )
}

function defaultValue() {
    return {
        password: '',
        newPassword: '',
        repeatNewPassword: ''
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
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a860'
    }
});

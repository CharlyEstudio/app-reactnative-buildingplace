import React, { useState, useEffect } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { size, isEmpty } from 'lodash';
import { useNavigation } from "@react-navigation/native";

// Firebase
import * as firebase from 'firebase';

// Validations
import { validateEmail } from '../../utils/validations';

// Components
import Loading from '../../components/Loading';

export default function RegisterForm({toastRef}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const onSubmit = async () => {
        if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)) {
            toastRef.current.show('Todos los campos son obligatorios');
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show('El email no es correcto');
        } else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show('Las contraseñas tienen que ser iguales');
        } else if (size(formData.password) < 6) {
            toastRef.current.show('El password debe ser mayor o igual a 6 caracteres');
        } else {
            setLoading(true);
            try {
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(formData.email, formData.password);
                toastRef.current.show('Cuenta creada correctamente');
                setLoading(false);
                navigation.navigate("account");
            } catch (e) {
                console.log('RegisterForm::createUserWithEmailAndPassword', e);
                setLoading(false);
                toastRef.current.show(`${e}`);
            }
        }
    };

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.nativeEvent.text
        });
    };

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electrónico"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "email")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true}
                onChange={e => onChange(e, "password")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true}
                onChange={e => onChange(e, "repeatPassword")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={() => onSubmit()}
            />
            <Loading isVisible={loading} text="Creando Cuenta" /> 
        </View>
    )
}

function defaultFormValue() {
    return {
        email: '',
        password: '',
        repeatPassword: ''
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: '100%',
        marginTop: 20
    },
    btnContainerRegister: {
        marginTop: 20,
        width: '95%'
    },
    btnRegister: {
        backgroundColor: '#00a680'
    },
    iconRight: {
        color: '#c1c1c1'
    }
})

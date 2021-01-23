import React, { useState, useEffect } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { useNavigation } from "@react-navigation/native";

// Firebase
import * as firebase from 'firebase';

// Validations
import { validateEmail } from '../../utils/validations';

// Components
import Loading from '../../components/Loading';

export default function LoginForm({toastRef}) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.nativeEvent.text
        });
    };

    const onSubmit = async () => {
        if (isEmpty(formData.email) || isEmpty(formData.password)) {
            toastRef.current.show('Todos los campos son obligatorios');
        } else if (!validateEmail(formData.email)) {
            toastRef.current.show('El email no es correcto');
        } else {
            setLoading(true);
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(formData.email, formData.password);
                toastRef.current.show('Sesión iniciada correctamente');
                setLoading(false);
                navigation.navigate("account");
            } catch (e) {
                setLoading(false);
                toastRef.current.show(`Usuario y/o contraseña incorrecta`);
            }
        }
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
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={() => onSubmit()}
            />
            <Loading isVisible={loading} text="Iniciando Sesión" /> 
        </View>
    )
}

function defaultFormValue() {
    return {
        email: '',
        password: ''
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
});

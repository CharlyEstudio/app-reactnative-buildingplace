import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// Firebase
import * as firebase from 'firebase';

// Components
import ToastGlobal from '../../components/ToastGlobal';
import Loading from '../../components/Loading';
import InfoUser from '../../components/Account/InfoUser';

export default function UserLogged() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })()
    }, []);

    const toastRef = useRef();

    return (
        <View style={styles.viewUserInfo}>
            {
                userInfo && <InfoUser
                    userInfo={userInfo}
                    toastRef={toastRef}
                    setLoading={setLoading}
                    setLoadingText={setLoadingText}
                />
            }
            <Text>Account Options</Text>
            <Button
                title="Cerrar Sesión"
                buttonStyle={styles.btnCloseSesion}
                titleStyle={styles.btnCloseSesionText}
                onPress={() => firebase.auth().signOut()}
            />
            <ToastGlobal toastRef={toastRef} />
            <Loading
                text={loadingText}
                isVisible={loading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: '100%',
        backgroundColor: '#f2f2f2'
    },
    btnCloseSesion: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSesionText: {
        color: '#00a860'
    }
});

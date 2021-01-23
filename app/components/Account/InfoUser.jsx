import React, { useEffect } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { Avatar } from 'react-native-elements';

// Firebase
import * as firebase from 'firebase';

// Photo & Permissions
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

// Avatar Default
import AvatarDefault from '../../../assets/img/avatar-default.jpg';

export default function InfoUser({userInfo: { uid, displayName, email, photoURL }, toastRef, setLoading, setLoadingText}) {
    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        const resultPermissionCamera = resultPermission.permissions.mediaLibrary.status;

        if (resultPermissionCamera === "denied") {
            toastRef.current.show('Es necesario aceptar los permisos de la galería');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (result.cancelled) {
                toastRef.current.show('Has cerrado la selección de imagenes');
            } else {
                try {
                    await uploadImage(result.uri);
                    await updatePhotoUrl();
                    toastRef.current.show('Avatar Actualizado');
                } catch (e) {
                    console.log(e);
                    toastRef.current.show('Error al actualizar el avatar');
                }
            }
        }
    };

    const uploadImage = async (uri) => {
        setLoadingText('Actualizando Avatar');
        setLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    };

    const updatePhotoUrl = async () => {
        const user = firebase.auth().currentUser;
        const urlImageStorage = await firebase.storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL();
        const update = {
            photoURL: urlImageStorage
        };
        await user.updateProfile(update);
        setLoading(false);
    };

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={() => changeAvatar()}
                containerStyle={styles.userInfoAvatar}
                source={photoURL ? { uri: photoURL } : AvatarDefault}
            />
            <View>
                <Text style={styles.displayName}>
                    {
                        displayName
                            ? displayName
                            : 'Anónimo'
                    }
                </Text>
                <Text>
                    {
                        email
                            ? email
                            : 'Social Login'
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5
    }
})

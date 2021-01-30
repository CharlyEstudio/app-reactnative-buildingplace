import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';

// Components
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions({userInfo, toastRef, setReloadUserInfo}) {
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);

    const selectComponent = (key, title) => {
        setShowModal(true);
        switch (key) {
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm
                        title={title}
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                break;
            case 'email':
                setRenderComponent(
                    <ChangeEmailForm
                        title={title}
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />
                );
                break;
            case 'password':
                setRenderComponent(
                    <ChangePasswordForm
                        title={title}
                        password={userInfo.password}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                );
                break;
            default:
                setShowModal(false);
                setRenderComponent(null);
                break;
        }
    };
    
    const menuOptions = generateOptions(selectComponent);

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        title={menu.title}
                        leftIcon={{
                            type: menu.iconType,
                            name: menu.iconNameLeft,
                            color: menu.iconColorLeft
                        }}
                        rightIcon={{
                            type: menu.iconType,
                            name: menu.iconNameRight,
                            color: menu.iconColorRight
                        }}
                        containerStyle={styles.menuItem}
                        onPress={menu.onPress}
                    />
                ))
            }
            {
                renderComponent &&
                    <Modal
                        isVisible={showModal}
                        setIsVisible={setShowModal}
                    >
                        {renderComponent}
                    </Modal>
            }
        </View>
    )
}

function generateOptions(selectComponent) {
    return [
        {
            title: 'Cambiar Nombre y Apellido',
            iconType: 'material-community',
            iconNameLeft: 'account-circle',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectComponent('displayName', 'Cambiar Nombre y Apellido')
        },
        {
            title: 'Cambiar Email',
            iconType: 'material-community',
            iconNameLeft: 'at',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectComponent('email', 'Cambiar Email')
        },
        {
            title: 'Cambiar Password',
            iconType: 'material-community',
            iconNameLeft: 'lock-reset',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectComponent('password', 'Cambiar Password')
        }
    ];
};

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
});

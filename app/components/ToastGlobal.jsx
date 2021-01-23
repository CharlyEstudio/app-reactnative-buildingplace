import React from 'react';
import Toast from 'react-native-easy-toast';

export default function ToastGlobal({toastRef}) {
    return (
        <Toast
            ref={toastRef}
            position="center"
            opacity={0.9}
        />
    )
}

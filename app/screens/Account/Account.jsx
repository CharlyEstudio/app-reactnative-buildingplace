import React, { useState, useEffect } from 'react';

// Firebase
import * as firebase from 'firebase';

// Screens
import Loading from '../../components/Loading';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

export default function Account() {
    const [login, setLogin] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setLogin(!user ? false : true);
        });
    }, [])

    if (login === null) return <Loading isVisible={true} text="Cargando..." />;

    return login ? <UserLogged /> : <UserGuest />;
}

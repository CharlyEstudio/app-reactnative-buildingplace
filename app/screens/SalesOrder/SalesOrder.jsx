import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

// Firebase
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';

// SQLite
import { DataBase, allSalesOrder } from '../../db/sqlite';
const dbSQLite = new DataBase().db;

export default function SalesOrder({ navigation }) {
	const [user, setUser] = useState(null);
	const [salesOrder, setSalesOrder] = useState([]);
	
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

	useEffect(() => {
        let allSalesOrder;
        async function fetchData() {
            allSalesOrder = await getAllSalesOrder(setSalesOrder);
            setSalesOrder(allSalesOrder);
            // setAttach(false);
        }
        fetchData();
    }, []); // attach

    return (
        <View style={styles.viewBody}>
			<Text>Sales Order</Text>
			{
				user &&
				<Icon
					reverse
					type="material-community"
					name="plus"
					color="#00a680"
					containerStyle={styles.btnContainer}
					onPress={() => navigation.navigate('add-sales-order')}
				/>
			}
        </View>
    )
}

async function getAllSalesOrder() {
    try {
        const resp = await allSalesOrder(dbSQLite);
        const { _array } = resp;
        return _array;
    } catch (e) {
        return [];
    }
};

const styles = StyleSheet.create({
	viewBody: {
		flex: 1,
		backgroundColor: '#fff'
	},
	btnContainer: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.5
	}
})

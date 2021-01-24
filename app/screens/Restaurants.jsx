import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { map } from 'lodash';

// SQLite
import { DataBase, allSalesOrder, newSalesOrder, deleteTable } from '../db/sqlite';

const dbSQLite = new DataBase().db;

export default function Restaurants() {
    const [attach, setAttach] = useState(false);
    const [salesOrder, setSalesOrder] = useState([]);

    useEffect(() => {
        let allSalesOrder;
        async function fetchData() {
            allSalesOrder = await getAllSalesOrder(setSalesOrder);
            setSalesOrder(allSalesOrder);
            setAttach(false);
        }
        fetchData();
    }, [attach]);

    const addSalesOrder = async () => {
        const datos = {
            cliente_id: 1,
            fecha: Date.now(),
            subtotal: 2786.32,
            iva: (2786.32 * .16),
            total: (2786.32 + (2786.32 * .16)),
            enviado: 0,
            procesado: 0,
            asesor: 1
        };
        const resp = await newSalesOrder(dbSQLite, datos);
        if (resp) {
            setAttach(true);
        }
    };

    const clearTable = async () => {
        console.log('Delete');
        await deleteTable(dbSQLite, 'table_pedidos');
        setAttach(true);
    };

    return (
        <View>
            <Text>Restaurants</Text>
            <Button
                title="Agregar Pedido"
                onPress={addSalesOrder}
            />
            <Button
                title="Borrar Tabla"
                onPress={clearTable}
            />
            {
                salesOrder.length > 0 &&
                map(salesOrder, (order, index) => (
                    <ListItem
                        key={index}
                        title={order.asesor}
                        containerStyle={styles.menuItem}
                    />
                ))
            }
        </View>
    )
}

async function getAllSalesOrder() {
    const resp = await allSalesOrder(dbSQLite);
    const { _array } = resp;
    return _array;
};

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { map } from 'lodash';

// SQLite
import { DataBase, allSalesOrder, newSalesOrder, deleteTable } from '../db/sqlite';
const dbSQLite = new DataBase().db;

export default function SalesOrder() {
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
        const cliente_id = Math.random();
        const numero = Math.random();
        const subtotal = Math.random();
        const ivaConcepto = 0.16;
        const iva = subtotal * ivaConcepto;
        const total = subtotal + iva;
        const asesor = Math.random();
        const datos = {
            cliente_id,
            numero: `PED-${numero}`,
            fecha: Date.now(),
            subtotal,
            iva,
            total,
            enviado: 0,
            procesado: 0,
            asesor
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
            <Text>Ordenes de Pedidos</Text>
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
                        title={order.numero}
                        containerStyle={styles.menuItem}
                    />
                ))
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
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
})

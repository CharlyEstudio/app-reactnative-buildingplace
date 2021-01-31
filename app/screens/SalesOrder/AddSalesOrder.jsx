import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

// Globals
import ToastGlobal from '../../components/ToastGlobal';
import Loading from '../../components/Loading';

// Components
import AddSalesOrderForm from '../../components/SalesOrder/AddSalesOrderForm';

export default function AddSalesOrder({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

    const toastRef = useRef();

    return (
        <View>
            <AddSalesOrderForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <ToastGlobal
                toastRef={toastRef}
            />
            <Loading
                isVisible={isLoading}
                text="Creando Pedido"
            />
        </View>
    )
}

const styles = StyleSheet.create({})
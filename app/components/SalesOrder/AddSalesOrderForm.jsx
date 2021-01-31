import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements';

// SQLite
import { DataBase, newSalesOrder, deleteTable } from '../../db/sqlite';
const dbSQLite = new DataBase().db;

// Mock Products
import * as productsJson from '../../db/mocks/products.json';

// Components
import ListItemsOrder from './ListItemsOrder';
import ListSearch from './ListSearch';

export default function AddSalesOrderForm({ toastRef, setIsLoading, navigation }) {
    // Todos los productos (Cache o Servidor Directo)
    const [products, setProducts] = useState(productsJson.products);

    // const [attach, setAttach] = useState(false);

    // Buscar en Input
    const [searchProduct, setSearchProduct] = useState([]);
    const [textSearch, setTextSearch] = useState('');

    // Estado de boton agregar
    const [isItem, setIsItem] = useState(true);

    // Order
    const [itemOrder, setItemOrder] = useState(valueDefaultItem());
    const [listOrder, setListOrder] = useState([]);
    const [order, setOrder] = useState(valueDefault());

    const searchProductForDescription = text => {
        // Meter un Loading cuando se haga consulta a servidor
        if (text.length > 0) {
            setTextSearch(text);
            const newData = products.filter(item => {
                const itemData = item.product.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setSearchProduct(newData);
        } else {
            setTextSearch('');
            setSearchProduct([]);
        } 
    };

    const autocompleteText = itemSearch => {
        setItemOrder({
            ...itemOrder,
            idProduct: itemSearch.idProduct,
            product: itemSearch.product,
            price: itemSearch.price
        });
        setSearchProduct([]);
    };

    const calculateSubtotal = quantity => {
        const subtotal = itemOrder.price * quantity;
        setItemOrder({
            ...itemOrder,
            quantity,
            subtotal
        });
        if (subtotal > 0) {
            setIsItem(false);
        } else {
            setIsItem(true);
        }
    };

    const addProduct = () => {
        setListOrder([...listOrder, itemOrder]);
        setItemOrder(valueDefaultItem);
        setIsItem(true);
    };

    const modifyQuantityItem = (item, quantity) => {
        if (item.quantity > 1) {
            const newList = listOrder.map(itemProd => {
                if (item.idProduct === itemProd.idProduct) {
                    const newQuantity = Number(itemProd.quantity) + Number(quantity);
                    if (newQuantity > 0) {
                        const subtotal = Number(itemProd.price) * Number(newQuantity);
                        itemProd.quantity = newQuantity;
                        itemProd.subtotal = subtotal;
                    }
                }
                return itemProd;
            });
            setListOrder(newList);
        } else {
            removeItemofListOrder(item);
        }
    };

    const removeItemofListOrder = item => {
        const newListRemove = listOrder.filter(e => e.idProduct !== item.idProduct);
        setListOrder(newListRemove);
    }

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
        /*if (resp) {
            setAttach(true);
        }*/
    };

    const clearTable = async () => {
        console.log('Delete');
        await deleteTable(dbSQLite, 'table_pedidos');
        setAttach(true);
    };

    return (
        <View style={styles.scrollView}>
            <FormAdd
                searchProductForDescription={searchProductForDescription}
                calculateSubtotal={calculateSubtotal}
                setItemOrder={setItemOrder}
                itemOrder={itemOrder}
            />
            <TouchableOpacity
                disabled={isItem}
                onPress={addProduct}
                style={isItem ? styles.buttonDis : styles.button}
            >
                <Text style={isItem ? styles.btnTextDis : styles.btnText}>Agregar Producto</Text>
            </TouchableOpacity>
            {
                searchProduct.length > 0 &&
                <View>
                    <Text style={styles.textSearch}>Buscando {textSearch}</Text>
                    <ListSearch
                        searchProduct={searchProduct}
                        autocompleteText={autocompleteText}
                    />
                </View>
            }
            {
                listOrder.length > 0 &&
                <View>
                    <Text style={styles.titleListOrder}>Mi Pedido</Text>
                    <ListItemsOrder
                        listOrder={listOrder}
                        modifyQuantityItem={modifyQuantityItem}
                        removeItemofListOrder={removeItemofListOrder}
                    />
                </View>
            }
        </View>
    )
}

function FormAdd({ itemOrder, searchProductForDescription, calculateSubtotal, setItemOrder }) {
    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del Producto"
                containerStyle={styles.input}
                onChange={e => searchProductForDescription(e.nativeEvent.text)}
                defaultValue={itemOrder.product && itemOrder.product}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={itemOrder.product && 'close-thick'}
                        iconStyle={styles.iconRight}
                        onPress={() => setItemOrder(valueDefaultItem())}
                    />
                }
            />
            <Input
                placeholder="Cantidad"
                containerStyle={styles.input}
                keyboardType='numeric'
                onChange={e => calculateSubtotal(e.nativeEvent.text)}
                defaultValue={itemOrder.quantity.toString() && itemOrder.quantity.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#00a680',
        padding: 10,
        borderRadius: 50,
    },
    buttonDis: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#e3e3e3',
        padding: 10,
        borderRadius: 50,
    },
    btnText: {
        color: "white",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    btnTextDis: {
        color: "black",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    textSearch: {
        marginBottom: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 13
    },
    titleListOrder: {
        marginBottom: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 13
    }
});

function valueDefault() {
    return {
        cliente_id: 0,
        numero: '',
        fecha: null,
        subtotal: 0,
        iva: 0,
        total: 0,
        enviado: 0,
        procesado: 0,
        asesor: 0,
        listOrder: []
    };
}

function valueDefaultItem() {
    return {
        idProduct: 0,
        product: '',
        quantity: '',
        price: 0,
        subtotal: 0
    };
}

function valueListOrder() {
    return {
        idProduct,
        product,
        quantity,
        price
    };
}
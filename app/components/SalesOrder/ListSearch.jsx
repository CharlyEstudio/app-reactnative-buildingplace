import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

export default function ListSearch({ searchProduct, autocompleteText }) {
    return (
        <FlatList
            style={styles.listItems}
            data={searchProduct}
            renderItem={({item, index}) => (
                <View style={styles.viewItem}>
                    <View style={styles.itemId}>
                        <Text style={styles.id}>{(index + 1)}</Text>
                    </View>
                    <View style={styles.itemDescription}>
                        <Text style={styles.titleItem}>{item.product}</Text>
                        <Text style={styles.subTitleItem}>{item.price} MXN</Text>
                    </View>
                    <View style={styles.viewButtons}>
                        <Icon
                            reverse
                            size={13}
                            type="material-community"
                            name="plus"
                            color="blue"
                            onPress={() => autocompleteText(item)}
                        />
                    </View>
                </View>
            )}
            keyExtractor={item => item.idProduct.toString()}
        />
    )
}

const styles = StyleSheet.create({
    listItems: {
        marginBottom: 40
    },
    viewItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    itemId: {
        flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    id: {
        fontWeight: 'bold',
        fontSize: 12
    },
    itemDescription: {
        flex: 5,
    },
    titleItem: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subTitleItem: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'gray'
    },
    viewButtons: {
        flex: 3,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    btnContainer: {
        backgroundColor: 'transparent'
    }
});

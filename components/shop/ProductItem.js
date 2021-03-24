import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

import Cart from '../../components/UI/Cart';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        
        <Cart style={styles.product}>
            <View>
                <TouchableCmp onPress={props.onSelect} >
            <View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.details} >
                <Text style={styles.title} >{props.title}</Text>
                <Text style={styles.price} >${props.price}</Text>
            </View>
            <View style={styles.actions} >
                {props.children}
            </View>
            </View>
            </TouchableCmp>
            </View>
        </Cart>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }

});

export default ProductItem;
import React from 'react';
import {View, 
        Text, 
        Image, 
        StyleSheet, 
        Button, 
        ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/card';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
 
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            
        <View style={styles.actions}>
            <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
            }}
            />
      </View>

            <Text style={styles.price} >${selectedProduct.price.toFixed(2)} </Text>
            <Text style={styles.description} >{selectedProduct.description} </Text>
        </ScrollView>
    ); 
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
    };
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 300,
        width: '100%',
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',

    },  
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }

});


export default ProductDetailScreen;

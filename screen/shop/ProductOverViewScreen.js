import React, {useEffect, useCallback} from 'react';
import { FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/card';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import { useState } from 'react';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefereshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    console.log('Load Products');
    setError(null);
    setIsRefereshing(true);
    
    try {
      await dispatch(productsActions.fetchProducts());
    }catch (err) {
      setError(err.message);
    }
    setIsRefereshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
   const willFocusSub = props.navigation.addListener('willFocus', () => loadProducts);

    return () => {
        willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandelar = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if (error) {
    return (<View style={styles.centered}>
    <Text>An error accured!!</Text>
    <Button title="Try again" 
            onPress={loadProducts} 
            color={Colors.primary} 
    />
  </View>);
  }

  if(isLoading) {
    return (
    <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>);
  }
  if (!isLoading && products.length === 0 ) {
    return (
      <View style={styles.centered}>
        <Text>No products found!! </Text>
      </View>);
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandelar(itemData.item.id, itemData.item.title);
          }}
         >
          <Button color={Colors.primary} 
                        title="View Detail"  
                        onPress={() => {
                          selectItemHandelar(itemData.item.id, itemData.item.title);
                        }} 
          />
          <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}); 

export default ProductsOverviewScreen;



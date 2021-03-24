import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import OrdersScreen from '../screen/shop/OrdersScreen';
import ProductsOverviewScreen from '../screen/shop/ProductOverViewScreen';
import ProductDetailScreen from '../screen/shop/ProductDetailScreen';
import Colors from '../constants/Colors';
import CartScreen from '../screen/shop/CartScreen';
import UserProductScreen from '../screen/user/UserProductScreen';
import EditProductScreen from '../screen/user/EditProductScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
                                    <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                                            size={23}
                                            color={drawerConfig.tintColor}
                                   />
                                  )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
// ===========
const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
                                  <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                                          size={23}
                                          color={drawerConfig.tintColor}
                                 />
                                )
  },
  defaultNavigationOptions: defaultNavOptions 
});


const AdminNavigator = createStackNavigator({
  UserProducts: UserProductScreen,
  EditProduct: EditProductScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
                                  <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                                          size={23}
                                          color={drawerConfig.tintColor}
                                 />
                                )
  },
  defaultNavigationOptions: defaultNavOptions 
});



const ShopeNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
});

export default createAppContainer(ShopeNavigator);
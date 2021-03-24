import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import Apploading from 'expo-app-loading';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/card';
import orderReducer from './store/reducers/orders';
import ShopeNavigator from './navigation/ShopeNavigator';
import { useState } from 'react';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
});

const fetchFonts =() => Font.loadAsync({
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(fontLoaded) {
    return(
      <Provider store={store} >
        <ShopeNavigator />
    </Provider>

    );
  }else {
    return (<Apploading startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError= {() => handleError(e)} />)
  }
}


 
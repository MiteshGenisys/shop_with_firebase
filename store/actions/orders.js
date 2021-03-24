import CartItem from "../../components/shop/CartItem";
import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {

        try {
            const responce = await fetch('https://rm-complite-guide-default-rtdb.firebaseio.com/orders/u1.json');
      
            if(!responce.ok) {
      
              throw new Error('Something went wrong!'); 
            }
      
          const resData = await responce.json();
          const loadedOrders = [];
      
          for (const key in resData) {
            loadedOrders.push(new   Order(
                                        key, 
                                        resData[key].CartItems, 
                                        resData[key].totalAmount, 
                                    ));
          }

        dispatch({type: SET_ORDERS, orders: loadedOrders});
    }catch (err) {
        throw err;
        }
    };
};

export const addOrder = (CartItems, totalAmount) => {
    return async dispatch => {
    const responce = await fetch('https://rm-complite-guide-default-rtdb.firebaseio.com/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CartItems,
        totalAmount
      })
    });
    
    if(!responce.ok) {
        throw new Error ('Someting went wrong!!');
    }
    const resData = await responce.json();
        dispatch(
            {  type: ADD_ORDER, 
                orderData: {id: resData.name, items: CartItems, amount: totalAmount} 
            });
        }
    };
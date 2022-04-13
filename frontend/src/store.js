import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './reducers/productReducers'

import { cartReducer  } from './reducers/cartReducers'

import {wishlistReducer} from './reducers/wishlistReducer'

import {sendEmailReducer} from './reducers/emailReducers'

import { userLoginReducer ,
        userRegisterReducer ,
        userDetailsReducer,
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,
        
    } from './reducers/userReducers'

import { orderCreateReducer,
        orderDetailsReducer,  
        orderPayReducer,
        orderListMyReducer,  
        orderDeliverReducer,
        orderListReducer,  
} from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    wishlist: wishlistReducer,
    sendEmail: sendEmailReducer
})

const  cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const  wishlistItemsFromStorage = localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : []

const  userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
    cart: {cartItems: cartItemsFromStorage,shippingAddress: shippingAddressFromStorage,},
    userLogin: {userInfo: userInfoFromStorage},
    wishlist: {wishlistItems: wishlistItemsFromStorage}
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))    
)

export default store
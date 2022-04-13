import {WISHLIST_ADD_ITEM,WISHLIST_REMOVE_ITEM} from '../constants/wishlistConstants'
import axios from 'axios'


export const addToWishList = (id) => async(dispatch,getState) =>{
    const {data} = await axios.get(`/api/products/${id}`)   

    dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,            
        }
    })

    localStorage.setItem('wishlistItems',JSON.stringify(getState().wishlist.wishlistItems))
    console.log("added to local storage")
}


export const removeFromWishList = (id) => (dispatch,getState) =>{

    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('wishlistItems',JSON.stringify(getState().wishlist.wishlistItems))

}
import {SEND_EMAIL_REQUEST,
        SEND_EMAIL_SUCCESS,
        SEND_EMAIL_FAIL
    } from '../constants/emailConstants'
import axios from 'axios'


export const sendEmail = (userInfo,cart) => async(dispatch,getState) =>{
    try{
        dispatch({ 
            type: SEND_EMAIL_REQUEST
        })
        const {data} = await axios.post('/api/email',{userInfo,cart})
        dispatch({
            type: SEND_EMAIL_SUCCESS,            
        })
        console.log(data)

    } catch(error){
        dispatch({
            type: SEND_EMAIL_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
    

}
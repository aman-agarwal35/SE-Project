import {SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAIL,
    SEND_EMAIL_RESET
} from '../constants/emailConstants'


export const sendEmailReducer = (state={},action) => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST:
            return { loading: true}
        case SEND_EMAIL_SUCCESS:
            return { loading: false,emailSendResult: true}
        case SEND_EMAIL_FAIL:
            return { loading: false,emailSendResult: action.payload}
        case SEND_EMAIL_RESET:
            return {}
        default:
            return state;
    }
}
import { actionTypes } from "./actionTypes";
/* import { appState } from "./appState"; */
import { v4 as uuidv4 } from 'uuid'

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            } 
        case actionTypes.SET_LOGOUT_USER:
            return {
                ...state,
                user: null
            }
        case actionTypes.SET_MESSAGE_TOAST:
            return {
                ...state,
                messageToast : [ ...state.messageToast, {...action.payload, id : uuidv4()} ]
            }
        case actionTypes.SET_CLEAR_MESSAGE_TOAST_BY_ID:
            return {
                ...state,
                messageToast: clearMessageToastById(state.messageToast,action.payload)
            }
        case actionTypes.SET_LEARNING_RESOURCES: 
            return {
                ...state,
                learningResources: action.payload
            }
        default:
            return state
    }
}

const clearMessageToastById = (messageToast, id) => {
    return messageToast?.filter(toast => toast.id !== id)
}

export default reducer

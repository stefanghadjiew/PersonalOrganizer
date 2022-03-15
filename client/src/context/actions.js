import { login,getLearningResources } from "../api"
import { actionTypes } from "./actionTypes"


export const loginUser = async (dispatch,userInfo,navigate) => {
    try {
        const res = await login(userInfo)
           dispatch({type: actionTypes.SET_USER, payload: { name: res.name,token: res.token, id: res.id }})
           dispatch({
               type: actionTypes.SET_MESSAGE_TOAST, 
               payload: {
                    type: 'success',
                    description: res.message
            }})
            navigate('/books') 
    } catch(err) {
        dispatch({
            type: actionTypes.SET_MESSAGE_TOAST, 
            payload: {
                type: 'error',
                description: err.message,
        }})
    }
}

export const logoutUser = (dispatch) => {
    dispatch({type: actionTypes.SET_LOGOUT_USER})
}

export const setLearningResources = async (dispatch,userId) => {
    dispatch({type: actionTypes.SET_LOADING,payload: true})
    try {
        const res = await getLearningResources(userId)
        dispatch({type: actionTypes.SET_LEARNING_RESOURCES,payload: res})
    } catch(err) {
        dispatch({
            type: actionTypes.SET_MESSAGE_TOAST, 
            payload: {
                type: 'error',
                description: err.message,
        }})
    }
    dispatch({type: actionTypes.SET_LOADING,payload: false})
}



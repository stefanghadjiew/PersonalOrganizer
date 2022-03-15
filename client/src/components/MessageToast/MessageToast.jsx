import React , { useEffect,useMemo } from "react";
import styles from './styles.module.css'
import { useAppContext } from "../../context/AppContext";
import { actionTypes } from "../../context/actionTypes";
import { CloseButton } from "..";
import { AiFillExclamationCircle,AiFillCheckCircle,AiFillInfoCircle } from 'react-icons/ai'


const MessageToast = () => {
    const { applicationState,dispatch } = useAppContext()
    const { messageToast } = applicationState

    const clearToast = (id) => {
        dispatch({
            type: actionTypes.SET_CLEAR_MESSAGE_TOAST_BY_ID, 
            payload: id
        })
    }

    useEffect(() => {
        if(messageToast.length !== 0) {
            setTimeout(() => {
                clearToast(messageToast[0].id)
            },5000)
        }
    }, [messageToast])

    //useMemo here to memoize
    const determineToastType = (toast) => {
        switch (toast.type) {
            case 'error': {
                return <AiFillExclamationCircle className={`${styles.icon} ${styles["icon-error"]}`}/>
            }
            case 'success': {
                return <AiFillCheckCircle className={`${styles.icon} ${styles["icon-success"]}`}/>
            }
            case 'info': {
                return <AiFillInfoCircle className={`${styles.icon} ${styles["icon-info"]}`}/>
            }
            default: {
                return <AiFillInfoCircle className={`${styles.icon} ${styles["icon-info"]}`}/>
            }
        }
    }

    const renderMessageToasts = messageToast?.map(toast => (
        <div className={`${styles[toast.type]} ${styles.toast}`} key={toast.id}>
            {determineToastType(toast)}
            <p className={styles['message-toast-description']}>{toast.description}</p>
            <CloseButton onClick={() => {clearToast(toast.id)}} text='X'/>
            
        </div>
    ))
    //add icons for the error,info,success
    
    return (
        <div className={styles['message-toast-wrapper']}>
            {renderMessageToasts}
        </div>
    )
}

export default MessageToast


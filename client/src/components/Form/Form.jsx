import React from 'react'
import './styles.css'
import {BsFillFilePersonFill} from 'react-icons/bs'
//import and use Button

const  Form = ({children}) => {
    return (
        <div className="form-container">
            <h1 className='form-container-header'>Personal Organizer</h1>
            <form className='form' autoComplete='off'>
                <h2 className='form-header'>Log Into Your Account</h2>
                <BsFillFilePersonFill className='big-icon'/>
                {children}
            </form>
        </div>
    )
}

export default Form

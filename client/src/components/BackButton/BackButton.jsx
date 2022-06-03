import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../IconButton/IconButton';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import classes from './styles.module.css';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <div className={classes['back-button-container']}>
            <IconButton
                tooltip="Back"
                onClick={() => navigate(-1)}
                icon={<MdKeyboardArrowLeft className={classes.icon} />}
            />
        </div>
    );
};

export default BackButton;

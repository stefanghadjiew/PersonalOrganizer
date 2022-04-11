import React from 'react';
import classes from './styles.module.css';
import Button from '../Button/Button';
import { useAppContext } from '../../context/AppContext';
import {
    closeBackdropAndRemoveChild,
    deleteResource,
} from '../../context/actions';

const ConfirmationDialog = ({
    confirmationDialogState,
    resourceId,
    learningResourceType,
}) => {
    const { dispatch } = useAppContext();
    const { isConfirmationDialogOpen, setIsConfirmationDialogOpen } =
        confirmationDialogState;

    const handleReject = () => {
        closeBackdropAndRemoveChild(dispatch);
        setIsConfirmationDialogOpen(false);
    };

    if (!isConfirmationDialogOpen) return null;

    return (
        <div className={classes.dialog}>
            <h3 className={classes.dialogTitle}>Confirm Delete?</h3>
            <div className={classes.actions}>
                <Button
                    style={{
                        borderRadius: '.5rem',
                        width: '100px',
                        border: '1px solid green',
                    }}
                    text="Yes"
                    onClick={() => {
                        deleteResource({
                            dispatch,
                            learningResourceType,
                            resourceId,
                        });
                    }}
                />
                <Button
                    style={{
                        borderRadius: '.5rem',
                        width: '100px',
                        border: '1px solid red',
                    }}
                    text="No"
                    onClick={handleReject}
                />
            </div>
        </div>
    );
};

export default ConfirmationDialog;

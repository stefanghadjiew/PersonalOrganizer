import React, { useEffect } from 'react';
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
    style,
}) => {
    const { dispatch, applicationState } = useAppContext();
    const { backdrop } = applicationState;
    const { isConfirmationDialogOpen, setIsConfirmationDialogOpen } =
        confirmationDialogState;

    const handleReject = () => {
        closeBackdropAndRemoveChild(dispatch);
        setIsConfirmationDialogOpen(false);
    };

    useEffect(() => {
        if (!backdrop.open) {
            setIsConfirmationDialogOpen(false);
        }
    }, [backdrop.open]);

    if (!isConfirmationDialogOpen) return null;

    return (
        <div style={style} className={classes.dialog}>
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

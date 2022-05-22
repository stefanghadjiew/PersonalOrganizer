import React, { useEffect } from 'react';
import classes from './styles.module.css';
import Button from '../Button/Button';
import { useAppContext } from '../../context/AppContext';
import {
    closeBackdropAndRemoveChild,
    deleteResource,
    deleteProject,
    deleteProjectTask,
    deleteProjectTaskSubtask,
} from '../../context/actions';

const ConfirmationDialog = ({
    confirmationDialogState,
    resourceId,
    learningResourceType,
    style,
    projectId,
    taskId,
    subtaskId,
    taskType,
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

    const handleDeletionConfirmation = async () => {
        if (!taskType) {
            await deleteResource({
                dispatch,
                learningResourceType,
                resourceId,
            });
        }
        if (taskType === 'project') {
            await deleteProject({
                dispatch,
                projectId,
                learningResourceType,
            });
        }
        if (taskType === 'task') {
            await deleteProjectTask({ dispatch, projectId, taskId });
        }
        if (taskType === 'subtask') {
            await deleteProjectTaskSubtask({
                dispatch,
                projectId,
                taskId,
                subtaskId,
            });
        }
    };

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
                    onClick={async () => {
                        await handleDeletionConfirmation();
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

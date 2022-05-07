import React, { useState, useRef, useEffect } from 'react';
import classes from './styles.module.css';
import {
    MdOutlineDeleteOutline,
    MdModeEditOutline,
    MdDone,
} from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import {
    IconButton,
    ConfirmationDialog,
    Button,
} from '../../../components';
import { openBackdropWithChild } from '../../../context/actions';
import { useAppContext } from '../../../context/AppContext';
import Tags from './Tags/Tags.jsx';
import { useInput } from '../../../customHooks';
import AddOrEditTaskOrSubtaskInput from './AddOrEditTaskOrSubtask/AddOrEditTaskOrSubtask';

const Task = ({ title, type = 'task', onClick, resourceId }) => {
    const { dispatch, applicationState } = useAppContext();
    const { backdrop } = applicationState;
    //types are project,task,subtask
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
        useState(false);
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [
        isAddTaskOrSubtaskInputVisible,
        setIsAddTaskOrSubtaskInputVisible,
    ] = useState(false);
    const [isEditInputVisible, setIsEditInputVisible] = useState(false);
    const addTaskOrSubtaskInput = useInput('');
    const editInput = useInput('');
    const taskRef = useRef(null);
    const addTaskOrSubtaskInputRef = useRef(null);
    const editTaskOrSubtaskInputRef = useRef(null);
    const tagsState = { isTagsOpen, setIsTagsOpen };
    const confirmationDialogState = {
        isConfirmationDialogOpen,
        setIsConfirmationDialogOpen,
    };

    const openConfirmDialog = () => {
        if (taskRef.current) {
            setIsConfirmationDialogOpen(true);
            openBackdropWithChild(null, dispatch);
            taskRef.current.style.zIndex = 11;
        }
    };

    const openTags = () => {
        if (taskRef.current) {
            setIsTagsOpen(true);
            openBackdropWithChild(null, dispatch);
            taskRef.current.style.zIndex = 11;
        }
    };

    const handleAddTaskOrSubtask = () => {
        setIsAddTaskOrSubtaskInputVisible(true);
        openBackdropWithChild(null, dispatch);
        if (addTaskOrSubtaskInputRef.current) {
            addTaskOrSubtaskInputRef.current.parentElement.style.zIndex = 11;
        }
    };

    const handleEditInput = () => {
        setIsEditInputVisible(true);
        openBackdropWithChild(null, dispatch);
        if (editTaskOrSubtaskInputRef.current) {
            editTaskOrSubtaskInputRef.current.parentElement.style.zIndex = 11;
        }
    };

    useEffect(() => {
        if (!backdrop.open && taskRef.current) {
            taskRef.current.style.zIndex = null;
        }
    }, [backdrop.open]);

    useEffect(() => {
        if (!backdrop.open && addTaskOrSubtaskInputRef.current) {
            addTaskOrSubtaskInputRef.current.parentElement.style.zIndex =
                null;
            setIsAddTaskOrSubtaskInputVisible(false);
        }
    }, [backdrop.open]);

    useEffect(() => {
        if (!backdrop.open && editTaskOrSubtaskInputRef.current) {
            editTaskOrSubtaskInputRef.current.parentElement.style.zIndex =
                null;
            setIsEditInputVisible(false);
        }
    }, [backdrop.open]);

    return (
        <div
            className={
                type === 'subtask'
                    ? `${classes.taskContainer} ${classes.subtask}`
                    : classes.taskContainer
            }
            ref={taskRef}
            onClick={onClick}
        >
            <div className={classes.taskTitle}>
                {title ? title : 'Dummy Task'}
            </div>
            {(type === 'task' || type === 'subtask') && !backdrop.open && (
                <div className={classes.tags}>
                    <Button
                        text="Tag"
                        style={{
                            borderRadius: '0',
                            padding: '.2rem .7rem',
                        }}
                        onClick={openTags}
                    />
                </div>
            )}
            {!backdrop.open && (
                <div className={classes.taskActions}>
                    {(type === 'project' || type === 'task') && (
                        <IconButton
                            icon={
                                <IoIosAdd
                                    style={{ fontSize: '1.2rem' }}
                                    className={`${classes['edit-icon']}`}
                                />
                            }
                            tooltip={
                                type === 'project'
                                    ? 'Add Task'
                                    : 'Add Subtask'
                            }
                            onClick={handleAddTaskOrSubtask}
                        />
                    )}

                    <IconButton
                        icon={
                            <MdOutlineDeleteOutline
                                style={{ fontSize: '1.2rem' }}
                                className={`${classes['delete-icon']}`}
                            />
                        }
                        tooltip="Delete"
                        onClick={openConfirmDialog}
                    />
                    <IconButton
                        icon={
                            <MdModeEditOutline
                                style={{ fontSize: '1.2rem' }}
                                className={`${classes['edit-icon']}`}
                            />
                        }
                        tooltip="Edit"
                        onClick={handleEditInput}
                    />
                    <IconButton
                        icon={
                            <MdDone
                                style={{ fontSize: '1.2rem' }}
                                className={`${classes['mark-as-done-icon']}`}
                            />
                        }
                        tooltip="Mark as done"
                    />
                </div>
            )}

            <ConfirmationDialog
                style={{ top: '80px' }}
                confirmationDialogState={confirmationDialogState}
                learningResourceType="projects"
                resourceId={resourceId} // Will this work for task/subtask ?
            />
            <Tags tagsState={tagsState} />
            <AddOrEditTaskOrSubtaskInput
                isVisible={isAddTaskOrSubtaskInputVisible}
                wrapperRef={addTaskOrSubtaskInputRef}
                input={addTaskOrSubtaskInput}
                taskType={type}
            />
            <AddOrEditTaskOrSubtaskInput
                isVisible={isEditInputVisible}
                wrapperRef={editTaskOrSubtaskInputRef}
                input={editInput}
                taskType="edit"
            />
        </div>
    );
};

export default Task;

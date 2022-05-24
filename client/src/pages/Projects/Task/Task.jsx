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
    Tooltip,
} from '../../../components';
import {
    markProjectTaskAsDone,
    markProjectTaskSubtaskAsDone,
    openBackdropWithChild,
} from '../../../context/actions';
import { useAppContext } from '../../../context/AppContext';
import Tags from './Tags/Tags.jsx';
import { useInput } from '../../../customHooks';
import AddOrEditTaskOrSubtaskInput from './AddOrEditTaskOrSubtask/AddOrEditTaskOrSubtask';
import Tag from './Tags/Tag/Tag';

const Task = ({
    title,
    type = 'task',
    onClick,
    resourceId,
    projectId,
    taskId,
    subtaskId,
    done,
    tags,
    style,
}) => {
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
    const [shouldHaveTooltipOnHover, setShouldHaveTooltipOnHover] =
        useState(false);
    const [isEditInputVisible, setIsEditInputVisible] = useState(false);
    const addTaskOrSubtaskInput = useInput('');
    const editInput = useInput('');
    const taskRef = useRef(null);
    const addTaskOrSubtaskInputRef = useRef(null);
    const editTaskOrSubtaskInputRef = useRef(null);
    const taskTitleRef = useRef(null);
    const tagsState = { isTagsOpen, setIsTagsOpen };
    const confirmationDialogState = {
        isConfirmationDialogOpen,
        setIsConfirmationDialogOpen,
    };

    const renderAppliedTags = tags?.map(tag => (
        <Tag tagType={tag} key={tag} />
    ));

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

    const handleMarkAsDoneClick = async () => {
        if (type === 'task') {
            await markProjectTaskAsDone({
                dispatch,
                projectId,
                taskId,
            });
        }
        if (type === 'subtask') {
            await markProjectTaskSubtaskAsDone({
                dispatch,
                projectId,
                taskId,
                subtaskId,
            });
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

    useEffect(() => {
        if (
            taskTitleRef?.current?.scrollHeight >
                taskTitleRef?.current?.clientHeight ||
            taskTitleRef?.current?.scollWidth >
                taskTitleRef?.current?.clientWidth
        ) {
            setShouldHaveTooltipOnHover(true);
        }
        taskRef?.current?.classList.remove(classes.selected);
    }, []);

    return (
        <div
            className={
                type === 'subtask'
                    ? done
                        ? `${classes.taskContainer} ${classes.subtask} ${classes.done}`
                        : `${classes.taskContainer} ${classes.subtask}`
                    : done
                    ? `${classes.taskContainer} ${classes.done}`
                    : classes.taskContainer
            }
            ref={taskRef}
            onClick={onClick}
            style={style}
        >
            <div className={classes['task-title-container']}>
                <div className={classes['task-title']} ref={taskTitleRef}>
                    {title ? title : 'Dummy Task'}
                    <Tooltip
                        tooltip={title}
                        show={shouldHaveTooltipOnHover}
                    />
                </div>
            </div>
            {(type === 'task' || type === 'subtask') && !backdrop.open && (
                <div className={classes.tags}>
                    {renderAppliedTags}
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
                    {!done && type !== 'project' && (
                        <IconButton
                            icon={
                                <MdDone
                                    style={{ fontSize: '1.2rem' }}
                                    className={`${classes['mark-as-done-icon']}`}
                                />
                            }
                            tooltip="Mark as done"
                            onClick={handleMarkAsDoneClick}
                        />
                    )}
                </div>
            )}

            <ConfirmationDialog
                style={{ top: '80px' }}
                confirmationDialogState={confirmationDialogState}
                learningResourceType="projects"
                projectId={projectId}
                taskId={taskId}
                subtaskId={subtaskId}
                resourceId={resourceId} // Will this work for task/subtask ? // remove later
                taskType={type}
            />
            <Tags
                tagsState={tagsState}
                projectId={projectId}
                taskId={taskId}
                subtaskId={subtaskId}
                taskType={type}
            />
            <AddOrEditTaskOrSubtaskInput
                isVisible={isAddTaskOrSubtaskInputVisible}
                wrapperRef={addTaskOrSubtaskInputRef}
                input={addTaskOrSubtaskInput}
                taskType={type}
                resourceId={resourceId} // remove later
                projectId={projectId}
                taskId={taskId}
                subtaskId={subtaskId}
            />
            <AddOrEditTaskOrSubtaskInput
                isVisible={isEditInputVisible}
                wrapperRef={editTaskOrSubtaskInputRef}
                input={editInput}
                resourceId={resourceId} // remove later
                projectId={projectId}
                taskId={taskId}
                subtaskId={subtaskId}
                taskType={type}
                actionType="edit"
            />
        </div>
    );
};

export default Task;

import React from 'react';
import { Input, Button } from '../../../../components';
import {
    editProject,
    createProjectTask,
    createProjectTaskSubtask,
    editProjectTask,
    editProjectTaskSubtask,
} from '../../../../context/actions';
import { useAppContext } from '../../../../context/AppContext';

const AddOrEditTaskOrSubtaskInput = ({
    isVisible,
    wrapperRef,
    input,
    taskType,
    resourceId,
    projectId,
    taskId,
    subtaskId,
    actionType,
}) => {
    const { dispatch } = useAppContext();

    const determineLabelByTaskType = () => {
        let label;
        switch (taskType) {
            case 'project':
                label = 'Add Task';
                break;
            case 'task':
                label = 'Add Subtask';
                break;
            case 'edit':
                label = 'Edit';
                break;
            default:
                label = 'No label';
                break;
        }
        return label;
    };

    const handleCreateClick = async () => {
        if (taskType === 'project') {
            await createProjectTask({
                dispatch,
                projectId,
                data: input.value,
            });
        }
        if (taskType === 'task') {
            await createProjectTaskSubtask({
                dispatch,
                projectId,
                taskId,
                data: input.value,
            });
        }
        input.setValue('');
    };

    const handleUpdateClick = async () => {
        if (taskType === 'project') {
            await editProject({
                dispatch,
                projectId,
                data: input.value,
            });
        }
        if (taskType === 'task') {
            await editProjectTask({
                dispatch,
                projectId,
                taskId,
                data: input.value,
            });
        }
        if (taskType === 'subtask') {
            await editProjectTaskSubtask({
                dispatch,
                projectId,
                taskId,
                subtaskId,
                data: input.value,
            });
        }
        input.setValue('');
    };

    return (
        <div
            ref={wrapperRef}
            style={{
                display: isVisible ? 'flex' : 'none',
                position: 'absolute',
                top: '40px',
                left: '50%',
                zIndex: 4,
            }}
        >
            <Input
                type="text"
                value={input.value}
                label={determineLabelByTaskType()}
                /* error={addTaskOrSubtaskInput.error} */
                onChange={input.onChange}
            />
            <Button
                text={actionType === 'edit' ? 'Update' : 'Create'}
                style={{
                    padding: '0.4rem .75rem',
                    position: 'absolute',
                    right: '.2rem',
                    top: '.15rem',
                }}
                disabled={input.value === ''}
                onClick={
                    actionType === 'edit'
                        ? handleUpdateClick
                        : handleCreateClick
                }
            />
        </div>
    );
};

export default AddOrEditTaskOrSubtaskInput;

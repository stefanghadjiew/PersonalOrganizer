import React from 'react';
import { Input, Button } from '../../../../components';
import {
    editProject,
    createProjectTask,
} from '../../../../context/actions';
import { useAppContext } from '../../../../context/AppContext';

const AddOrEditTaskOrSubtaskInput = ({
    isVisible,
    wrapperRef,
    input,
    taskType,
    resourceId,
}) => {
    const { dispatch } = useAppContext();
    const determineLabelByTaskType = () => {
        let label;
        switch (taskType) {
            case 'project':
                label = 'Add Task';
                return label;
            case 'task':
                label = 'Add Subtask';
                return label;
            case 'edit':
                label = 'Edit';
                return label;
            default:
                label = 'No label';
                return label;
        }
    };

    const handleCreateClick = async () => {
        await createProjectTask({
            dispatch,
            resourceId,
            data: input.value,
        });
        input.setValue('');
    };

    const handleUpdateClick = async () => {
        await editProject({
            dispatch,
            resourceId,
            data: input.value,
        });
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
                text={taskType === 'edit' ? 'Update' : 'Create'}
                style={{
                    padding: '0.4rem .75rem',
                    position: 'absolute',
                    right: '.2rem',
                    top: '.15rem',
                }}
                disabled={input.value === ''}
                onClick={
                    taskType === 'edit'
                        ? handleUpdateClick
                        : handleCreateClick
                }
            />
        </div>
    );
};

export default AddOrEditTaskOrSubtaskInput;

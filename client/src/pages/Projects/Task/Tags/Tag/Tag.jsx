import React from 'react';
import classes from './styles.module.css';
import { useAppContext } from '../../../../../context/AppContext';
import {
    deleteProjectTaskTag,
    deleteProjectTaskSubtaskTag,
} from '../../../../../context/actions';
import { IoIosClose } from 'react-icons/io';
import { IconButton } from '../../../../../components';

const Tag = ({
    tagType,
    taskType,
    projectId,
    taskId,
    subtaskId,
    openTags,
    onClickTagHandler,
    isApplied = false,
}) => {
    const {
        dispatch,
        applicationState: { backdrop },
    } = useAppContext();

    const determineClassName = () => {
        let tagClassName;
        switch (tagType) {
            case 'blocker':
                return (tagClassName = classes.blocker);
            case 'high priority':
                return (tagClassName = classes['high-priority']);
            case 'low priority':
                return (tagClassName = classes['low-priority']);
            case 'up next':
                return (tagClassName = classes['up-next']);
            case 'remember':
                return (tagClassName = classes['remember']);
            case 'design':
                return (tagClassName = classes['design']);
            case 'bugs':
                return (tagClassName = classes['bugs']);
            case 'in progress':
                return (tagClassName = classes['in-progress']);
            case 'investigate':
                return (tagClassName = classes['investigate']);
            case 'test':
                return (tagClassName = classes['test']);
            default:
                return tagClassName;
        }
    };

    const onRemoveTag = async () => {
        if (taskType === 'task') {
            await deleteProjectTaskTag({
                dispatch,
                config: { projectId, taskId, tag: tagType },
            });
        }
        if (taskType === 'subtask') {
            await deleteProjectTaskSubtaskTag({
                dispatch,
                config: { projectId, taskId, subtaskId, tag: tagType },
            });
        }
    };

    return (
        <div
            className={`${classes.tag} ${determineClassName()}`}
            onClick={!backdrop.open ? openTags : onClickTagHandler}
        >
            {tagType}
            {isApplied && (
                <IconButton
                    onClick={onRemoveTag}
                    wrapperStyle={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                    }}
                    icon={<IoIosClose style={{ fontSize: '1rem' }} />}
                />
            )}
        </div> // icon button in the div with onClick = {onRemoveTagHandler}
    );
};

export default Tag;

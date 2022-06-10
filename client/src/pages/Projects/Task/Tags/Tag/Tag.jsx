import React from 'react';
import classes from './styles.module.css';

const Tag = ({
    tagType,
    /*   taskType,
    projectId,
    taskId,
    subtaskId, */
    onClickTagHandler,
}) => {
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

    return (
        <div
            className={`${classes.tag} ${determineClassName()}`}
            onClick={onClickTagHandler}
        >
            {tagType}
        </div>
    );
};

export default Tag;

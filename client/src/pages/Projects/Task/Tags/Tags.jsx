import React, { useEffect } from 'react';
import classes from './styles.module.css';
import { Input } from '../../../../components';
import { useInput } from '../../../../customHooks';
import { tags } from './tags.js';
import Tag from './Tag/Tag';
import { useAppContext } from '../../../../context/AppContext';
import { createTag } from '../../../../context/actions';

const Tags = ({ tagsState, projectId, taskId, subtaskId, taskType }) => {
    const { dispatch, applicationState } = useAppContext();
    const { backdrop } = applicationState;
    const { isTagsOpen, setIsTagsOpen } = tagsState;
    const searchTag = useInput('');
    const renderTags = tags.map(tag => (
        <Tag
            tagType={tag}
            onClickTagHandler={async () => await handleClick(tag)}
            key={tag}
        />
    ));

    useEffect(() => {
        if (!backdrop.open) {
            setIsTagsOpen(false);
        }
    }, [backdrop.open]);

    const handleClick = async tag => {
        if (taskType === 'task') {
            await createTag({
                dispatch,
                type: taskType,
                config: { projectId, taskId, tag },
            });
        }
        if (taskType === 'subtask') {
            await createTag({
                dispatch,
                type: taskType,
                config: { projectId, taskId, subtaskId, tag },
            });
        }
    };

    if (!isTagsOpen) return null;

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <Input
                    type="text"
                    value={searchTag.value}
                    label="Find Tag"
                    error={searchTag.error}
                    onChange={searchTag.onChange}
                />
            </div>

            <div className={classes.tags}>{renderTags}</div>
        </div>
    );
};

export default Tags;

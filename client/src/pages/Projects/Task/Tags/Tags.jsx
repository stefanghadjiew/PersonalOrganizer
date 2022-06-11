import React, { Fragment, useEffect } from 'react';
import classes from './styles.module.css';
import { Input, Divider, Subtitle } from '../../../../components';
import { useInput } from '../../../../customHooks';
import { tags } from './tags.js';
import Tag from './Tag/Tag';
import { useAppContext } from '../../../../context/AppContext';
import { createTag } from '../../../../context/actions';

const Tags = ({
    tagsState,
    projectId,
    taskId,
    subtaskId,
    taskType,
    appliedTags,
}) => {
    const {
        dispatch,
        applicationState: { backdrop },
    } = useAppContext();
    const { isTagsOpen, setIsTagsOpen } = tagsState;
    const searchTag = useInput('');
    const renderTags = tags.map(tag => (
        <Tag
            tagType={tag}
            onClickTagHandler={async () => await handleClick(tag)}
            key={tag}
        />
    ));

    const renderAppliedTags = appliedTags?.map(appliedTag => (
        <Tag
            tagType={appliedTag}
            key={appliedTag}
            taskType={taskType}
            projectId={projectId}
            taskId={taskId}
            subtaskId={subtaskId}
            isApplied={true}
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
            {appliedTags.length !== 0 && (
                <Fragment>
                    <Divider style={{ margin: '1rem 0' }} />
                    <Subtitle
                        wrapperStyle={{
                            margin: '0 13px',
                            paddingBottom: '15px',
                        }}
                        text="Selected Tags:"
                    />
                    <div style={{ margin: '0 13px' }}>
                        {renderAppliedTags}
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default Tags;

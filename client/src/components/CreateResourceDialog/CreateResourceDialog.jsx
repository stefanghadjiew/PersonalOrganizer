import React from 'react';
import Form from '../Form/Form.jsx';
import Input from '../Input/Input.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import { useInput, useCheckbox } from '../../customHooks';
import Button from '../Button/Button.jsx';
import { IoIosClose } from 'react-icons/io';
import IconButton from '../IconButton/IconButton.jsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // doesent work with css modules ??
import { useAppContext } from '../../context/AppContext.js';
import { actionTypes } from '../../context/actionTypes.js';
import { createLearningResource } from '../../api/index.js';
import './styles.css';
import FramerMotionAnimations from '../FramerMotionAnimations/FramerMotionAnimations.jsx';

import { closeBackdropAndRemoveChild } from '../../context/actions.js';

const CreateResourceDialog = ({ learningResourceType }) => {
    const { dispatch, applicationState } = useAppContext();
    const { user } = applicationState;
    const { id } = user;

    const link = useInput('');

    const title = useInput('');
    const description = useInput('');
    const domain = useInput('');
    const img = useInput('');
    const favicon = useInput('');
    const checkbox = useCheckbox(false);

    const aditionalInputs = [
        { ...title, label: 'title' },
        { ...description, label: 'description' },
        { ...domain, label: 'domain' },
        { ...img, label: 'img' },
        { ...favicon, label: 'favicon' },
    ];

    const renderInputs = aditionalInputs.map(input => (
        <CSSTransition
            key={input.label}
            timeout={500}
            classNames="transition"
        >
            <Input
                type="text"
                key={input.label}
                value={input.value}
                label={input.label}
                error={input.error}
                onChange={input.onChange}
            />
        </CSSTransition>
    ));

    const createNewResource = async e => {
        e.preventDefault();
        try {
            await createLearningResource(id, learningResourceType, {
                link: link.value,
            });
            dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
        } catch (err) {
            dispatch({
                type: actionTypes.SET_MESSAGE_TOAST,
                payload: {
                    type: 'error',
                    description: err.message,
                },
            });
        }
    };

    return (
        <FramerMotionAnimations
            animationType="top-to-bottom"
            motionKey="create-resource-dialog"
            motionDivStyle={{ width: '100%' }}
        >
            <Form
                title="Create new resource"
                style={{
                    backgroundColor: '#A7C7E7',
                    position: 'relative',
                    boxShadow: 'none',
                    padding: '1rem 3rem',
                    minWidth: '450px',
                }}
            >
                <Input
                    type="text"
                    value={link.value}
                    label="link"
                    error={link.error}
                    onChange={link.onChange}
                />
                <Checkbox
                    label="inputs"
                    checked={checkbox.checked}
                    onChange={checkbox.onChange}
                />
                <TransitionGroup
                    className={
                        checkbox.checked
                            ? 'transition-group-active'
                            : 'transition-group'
                    }
                >
                    {checkbox.checked && renderInputs}
                </TransitionGroup>
                <Button
                    text="Create Resource"
                    onClick={createNewResource}
                    disabled={link.value === ''}
                />
                <div className="icon-button-wrapper">
                    <IconButton
                        icon={<IoIosClose className="icon" />}
                        tooltip="Close dialog"
                        onClick={e => {
                            e.preventDefault();
                            closeBackdropAndRemoveChild(dispatch);
                        }}
                    />
                </div>
            </Form>
        </FramerMotionAnimations>
    );
};

export default CreateResourceDialog;

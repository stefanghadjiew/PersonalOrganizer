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

    const createNewResource = e => {
        e.preventDefault();
        createLearningResource(id, learningResourceType, {
            link: link.value,
        });
    };

    const handleClose = () => {
        dispatch({
            type: actionTypes.SET_BACKDROP,
            payload: { open: false, child: null },
        });
    };

    return (
        <Form
            title="Create new resource"
            style={{ backgroundColor: '#808080', position: 'relative' }}
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

            <Button text="Create Resource" onClick={createNewResource} />
            <div className="icon-button-wrapper">
                <IconButton
                    icon={<IoIosClose className="icon" />}
                    tooltip="Close dialog"
                    onClick={handleClose}
                />
            </div>
        </Form>
    );
};

export default CreateResourceDialog;

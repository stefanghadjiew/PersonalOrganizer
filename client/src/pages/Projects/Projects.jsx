import React, { useRef, useEffect, Fragment, useState } from 'react';
import { Page } from '../../containers';
import { Title, Subtitle, Input, Search, Button } from '../../components';
import { useInput, useLearningResources } from '../../customHooks';
import classes from './styles.module.css';
import {
    openBackdropWithChild,
    createProject,
} from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import Task from './Task/Task';

const Projects = ({ learningResourceType }) => {
    const resources = useLearningResources(learningResourceType);
    const [
        currentProjectTasksAndSubtasks,
        setCurrentProjectTasksAndSubtasks,
    ] = useState([]);
    const createTaskInputRef = useRef(null);
    const { dispatch, applicationState } = useAppContext();
    const { backdrop, user } = applicationState;
    const createProjectInput = useInput('');
    const projectsRefs = useRef([]);
    projectsRefs.current = [];

    const handleInputClick = () => {
        if (createTaskInputRef.current) {
            openBackdropWithChild(null, dispatch);
            createTaskInputRef.current.parentElement.style.zIndex = 11;
        }
    }; // Think about weather you need to add zIndex via refs (maybe just apply it as a style, since you dont remove it in useEffect)

    useEffect(() => {
        if (!backdrop.open && createTaskInputRef.current) {
            createTaskInputRef.current.parentElement.style.zIndex = null;
        }
    }, [backdrop.open]);

    const renderProjectTasks = project => {
        const { tasks } = project;
        const renderTasks = tasks?.map(task => {
            const { subtasks } = task;
            return (
                <Fragment key={task._id}>
                    <Task
                        type="task"
                        title={task.title}
                        resourceId={task._id}
                    />
                    {subtasks.map(subtask => (
                        <Task
                            type="subtask"
                            title={subtask.title}
                            key={subtask._id}
                            resourceId={subtask._id}
                        />
                    ))}
                </Fragment>
            );
        });
        return renderTasks;
    };

    const addSelectedClassToProject = project => {
        if (project && projectsRefs.current) {
            const selectedProjectRef = projectsRefs.current.find(
                el => el.id === project._id
            );

            selectedProjectRef.childNodes[1].classList.add(
                classes.selected
            );

            projectsRefs.current.filter(pr => {
                if (pr.id !== project._id) {
                    pr.childNodes[1].classList.remove(classes.selected);
                }
                return projectsRefs.current;
            });
        }
    };

    const addToProjectsRefs = project => {
        if (project && !projectsRefs.current.includes(project)) {
            projectsRefs.current.push(project);
        }
    };

    const renderProjects = resources?.map(project => (
        <div
            ref={addToProjectsRefs}
            style={{ borderRadius: '4px' }}
            key={project._id}
            id={project._id}
        >
            {' '}
            <Task
                title={project.title}
                key={project._id}
                resourceId={project._id}
                type="project"
                onClick={() => {
                    addSelectedClassToProject(project);
                    setCurrentProjectTasksAndSubtasks(
                        renderProjectTasks(project)
                    );
                }}
            />
        </div>
    ));

    return (
        <Page>
            <Title text="Projects" />
            <div className={classes.inputs}>
                <Search
                    style={{
                        padding: 0,
                        marginRight: '1rem',
                        width: '30%',
                    }}
                />

                <div className={classes.createTask}>
                    <Input
                        ref={createTaskInputRef}
                        type="text"
                        label="Create Project"
                        value={createProjectInput.value}
                        onChange={createProjectInput.onChange}
                        /* error={createTask.error} */
                        wrapperStyle={{ width: '500px' }}
                        style={{ cursor: ' pointer', height: '40px' }}
                        onClick={handleInputClick}
                    />

                    <Button
                        text="Create"
                        style={{
                            padding: '0.5rem 1rem',
                            position: 'absolute',
                            right: '.2rem',
                            top: '.15rem',
                        }}
                        disabled={createProjectInput.value === ''}
                        onClick={async () => {
                            await createProject({
                                dispatch,
                                userId: user.id,
                                learningResourceType,
                                data: createProjectInput.value,
                            });
                            createProjectInput.setValue('');
                        }}
                    />
                </div>
            </div>
            <div className={classes.projectsContainer}>
                <div className={classes.projects}>
                    <Subtitle text="Projects" />
                    {renderProjects}
                </div>
                <div className={classes.taskListContainer}>
                    <Subtitle text="Project Tasks" />

                    {currentProjectTasksAndSubtasks}
                </div>
            </div>
        </Page>
    );
};

export default Projects;

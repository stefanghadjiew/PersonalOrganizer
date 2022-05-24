import React, { useRef, useEffect, Fragment } from 'react';
import { Page } from '../../containers';
import {
    Title,
    Subtitle,
    Input,
    Search,
    Button,
    Accordion,
} from '../../components';
import { useInput, useLearningResources } from '../../customHooks';
import classes from './styles.module.css';
import {
    openBackdropWithChild,
    createProject,
    setCurrentlyDisplayedProject,
} from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import Task from './Task/Task';

const Projects = ({ learningResourceType }) => {
    const resources = useLearningResources(learningResourceType);
    const createTaskInputRef = useRef(null);
    const {
        dispatch,
        applicationState: { backdrop, user, currentlyDisplayedProject },
    } = useAppContext();

    const createProjectInput = useInput('');
    const projectsRefs = useRef([]);
    projectsRefs.current = [];
    const currentProject = resources?.find(
        res => res._id === currentlyDisplayedProject?._id
    );

    useEffect(() => {
        if (!backdrop.open && createTaskInputRef.current) {
            createTaskInputRef.current.parentElement.style.zIndex = null;
        }
    }, [backdrop.open]);

    useEffect(() => {
        if (resources.length > 0) {
            setCurrentlyDisplayedProject(dispatch, resources[0]);
            addSelectedClassToProject(resources[0]);
        }
    }, []);

    const handleInputClick = () => {
        if (createTaskInputRef.current) {
            openBackdropWithChild(null, dispatch);
            createTaskInputRef.current.parentElement.style.zIndex = 11;
        }
    }; // Think about weather you need to add zIndex via refs (maybe just apply it as a style, since you dont remove it in useEffect)

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

    const renderProjects = resources?.map(project => {
        return (
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
                    projectId={project._id}
                    type="project"
                    onClick={() => {
                        setCurrentlyDisplayedProject(dispatch, project);
                        addSelectedClassToProject(project);
                    }}
                />
            </div>
        );
    });

    const renderCurrentProjectTasksAndSubtasks = project => {
        if (project) {
            const { tasks } = project;
            const renderTasks = tasks?.map(task => {
                const { subtasks } = task;
                return (
                    <Fragment key={task._id}>
                        <Task
                            type="task"
                            title={task.title}
                            projectId={project._id}
                            taskId={task._id}
                            tags={task.tags}
                            done={task.done}
                            style={{ backgroundColor: 'white' }}
                        />
                        {subtasks.map(subtask => (
                            <Task
                                type="subtask"
                                title={subtask.title}
                                key={subtask._id}
                                projectId={project._id}
                                taskId={task._id}
                                subtaskId={subtask._id}
                                tags={subtask.tags}
                                done={subtask.done}
                                style={{ backgroundColor: 'white' }}
                            />
                        ))}
                    </Fragment>
                );
            });
            return renderTasks;
        }
    };

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
                    <Accordion title="Current Tasks">
                        {renderCurrentProjectTasksAndSubtasks(
                            currentProject
                        )}
                    </Accordion>
                </div>
            </div>
        </Page>
    );
};

export default Projects;

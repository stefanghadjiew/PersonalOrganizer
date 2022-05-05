import {
    login,
    getLearningResources,
    createLearningResource,
    deleteLearningResource,
    apiCreateProject,
    apiDeleteProject,
    apiEditProject,
    apiCreateProjectTask,
    apiEditProjectTask,
    apiDeleteProjectTask,
    apiCreateProjectTaskSubtask,
    apiEditProjectTaskSubtask,
    apiDeleteProjectTaskSubtask,
    apiCreateTag,
    apiMarkTaskAsDone,
    apiMarkTaskSubtaskAsDone,
    apiDeleteProjectTaskTag,
    apiDeleteProjectTaskSubtaskTag,
} from '../api';
import { actionTypes } from './actionTypes';
import { learningResourcesType } from './learningResourcesType';

export const loginUser = async (dispatch, userInfo, navigate) => {
    try {
        const res = await login(userInfo);
        dispatch({
            type: actionTypes.SET_USER,
            payload: { name: res.name, token: res.token, id: res.id },
        });
        openMessageToastWithSuccess(dispatch, res.message);
        navigate('/javascript');
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const logoutUser = dispatch => {
    dispatch({ type: actionTypes.SET_LOGOUT_USER });
};

export const setLearningResources = async (
    dispatch,
    userId,
    learningResourceType
) => {
    const actionType = determineActionType(learningResourceType);

    try {
        const res = await getLearningResources(
            learningResourceType,
            userId
        );
        dispatch({
            type: actionType,
            payload: res,
        });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const setLightTheme = dispatch => {
    dispatch({ type: actionTypes.SET_LIGHT_THEME });
};

export const setDarkTheme = dispatch => {
    dispatch({ type: actionTypes.SET_DARK_THEME });
};

export const openBackdropWithChild = (component, dispatch) => {
    dispatch({
        type: actionTypes.SET_BACKDROP,
        payload: {
            open: true,
            component,
            isOpen: true,
        },
    });
};

export const setResultsPerPage = (dispatch, resultsPerPage) => {
    dispatch({
        type: actionTypes.SET_RESULTS_PER_PAGE,
        payload: resultsPerPage,
    });
};

export const closeBackdropAndRemoveChild = dispatch => {
    dispatch({
        type: actionTypes.SET_BACKDROP,
        payload: {
            open: false,
            component: null,
            isOpen: false,
        },
    });
};

export const createNewResource = async ({
    dispatch,
    userId,
    learningResourceType,
    link,
}) => {
    try {
        await createLearningResource(userId, learningResourceType, {
            link: link.value,
        });
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const deleteResource = async ({
    dispatch,
    learningResourceType,
    resourceId,
}) => {
    try {
        await deleteLearningResource({ learningResourceType, resourceId });
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

//TODO: Projects Page
export const createProject = async ({
    dispatch,
    userId,
    learningResourceType,
    data,
}) => {
    try {
        const res = await apiCreateProject({
            userId,
            learningResourceType,
            data,
        });
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
        openMessageToastWithSuccess(dispatch, res.message);
        closeBackdropAndRemoveChild(dispatch);
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const deleteProject = async ({
    dispatch,
    resourceId,
    learningResourceType,
}) => {
    try {
        const res = await apiDeleteProject({
            resourceId,
            learningResourceType,
        });
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
        openMessageToastWithSuccess(dispatch, res.message);
        closeBackdropAndRemoveChild(dispatch);
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const editProject = async ({ dispatch, resourceId, data }) => {
    try {
        const res = await apiEditProject({ resourceId, data });
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
        openMessageToastWithSuccess(dispatch, res.message);
        closeBackdropAndRemoveChild(dispatch);
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const createProjectTask = async ({ dispatch, projectId, data }) => {
    try {
        const res = await apiCreateProjectTask({ projectId, data });
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
        openMessageToastWithSuccess(dispatch, res.message);
        closeBackdropAndRemoveChild(dispatch);
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};
export const editProjectTask = async ({
    dispatch,
    projectId,
    taskId,
    data,
}) => {
    try {
        const res = await apiEditProjectTask({ projectId, taskId, data });
        openMessageToastWithSuccess(dispatch, res.message);
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};
export const deleteProjectTask = async ({
    dispatch,
    projectId,
    taskId,
}) => {
    try {
        const res = await apiDeleteProjectTask({ projectId, taskId });
        openMessageToastWithSuccess(dispatch, res.message);
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const createProjectTaskSubtask = async ({
    dispatch,
    projectId,
    taskId,
    data,
}) => {
    try {
        const res = await apiCreateProjectTaskSubtask({
            projectId,
            taskId,
            data,
        });
        openMessageToastWithSuccess(dispatch, res.message);
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};
export const editProjectTaskSubtask = async ({
    dispatch,
    projectId,
    taskId,
    subtaskId,
    data,
}) => {
    try {
        const res = await apiEditProjectTaskSubtask({
            projectId,
            taskId,
            subtaskId,
            data,
        });
        openMessageToastWithSuccess(dispatch, res.message);
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};
export const deleteProjectTaskSubtask = async ({
    dispatch,
    projectId,
    taskId,
    subtaskId,
}) => {
    try {
        const res = await apiDeleteProjectTaskSubtask({
            projectId,
            taskId,
            subtaskId,
        });
        openMessageToastWithSuccess(dispatch, res.message);
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

export const createTag = async () => {};

export const markProjectTaskAsDone = async ({
    dispatch,
    projectId,
    taskId,
}) => {
    try {
        const res = await apiMarkTaskAsDone({ projectId, taskId });
        openMessageToastWithSuccess(dispatch, res.message);
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};
export const markProjectTaskSubtaskAsDone = async ({
    dispatch,
    projectId,
    taskId,
    subtaskId,
}) => {
    try {
        const res = await apiMarkTaskSubtaskAsDone({
            projectId,
            taskId,
            subtaskId,
        });
        openMessageToastWithSuccess(dispatch, res.message);
        dispatch({ type: actionTypes.SET_TRIGGER_RERENDER });
    } catch (err) {
        openMessageToastWithError(dispatch, err.message);
    }
};

const determineActionType = learningResourceType => {
    switch (learningResourceType) {
        case learningResourcesType.JAVASCRIPT:
            return actionTypes.SET_JAVASCRIPT_RESOURCES;
        case learningResourcesType.REACTJS:
            return actionTypes.SET_REACTJS_RESOURCES;
        case learningResourcesType.NODEJS:
            return actionTypes.SET_NODEJS_RESOURCES;
        case learningResourcesType.NPM_PACKAGES:
            return actionTypes.SET_NPM_PACKAGES;
        case learningResourcesType.CSS:
            return actionTypes.SET_CSS_RESOURCES;
        case learningResourcesType.OTHERS:
            return actionTypes.SET_OTHERS_RESOURCES;
        case learningResourcesType.PROJECTS:
            return actionTypes.SET_PROJECTS;
        default:
            return;
    }
};

const openMessageToastWithSuccess = (dispatch, message) => {
    dispatch({
        type: actionTypes.SET_MESSAGE_TOAST,
        payload: {
            type: 'success',
            description: message,
        },
    });
};
const openMessageToastWithError = (dispatch, message) => {
    dispatch({
        type: actionTypes.SET_MESSAGE_TOAST,
        payload: {
            type: 'error',
            description: message,
        },
    });
};

import { login, getLearningResources } from '../api';
import { actionTypes } from './actionTypes';
import { learningResourcesType } from './learningResourcesType';

export const loginUser = async (dispatch, userInfo, navigate) => {
    try {
        const res = await login(userInfo);
        dispatch({
            type: actionTypes.SET_USER,
            payload: { name: res.name, token: res.token, id: res.id },
        });
        dispatch({
            type: actionTypes.SET_MESSAGE_TOAST,
            payload: {
                type: 'success',
                description: res.message,
            },
        });
        navigate('/javascript');
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

export const logoutUser = dispatch => {
    dispatch({ type: actionTypes.SET_LOGOUT_USER });
};

export const setLearningResources = async (
    dispatch,
    userId,
    learningResourceType
) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
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
        dispatch({
            type: actionTypes.SET_MESSAGE_TOAST,
            payload: {
                type: 'error',
                description: err.message,
            },
        });
    }
    dispatch({ type: actionTypes.SET_LOADING, payload: false });
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
        default:
            return;
    }
};

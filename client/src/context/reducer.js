import { actionTypes } from './actionTypes';
import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case actionTypes.SET_DARK_THEME: {
            return {
                ...state,
                theme: {
                    dark: true,
                    light: false,
                },
            };
        }
        case actionTypes.SET_LIGHT_THEME: {
            return {
                ...state,
                theme: {
                    dark: false,
                    light: true,
                },
            };
        }
        case actionTypes.SET_LOGOUT_USER:
            return {
                ...state,
                user: null,
            };
        case actionTypes.SET_TRIGGER_RERENDER:
            return {
                ...state,
                triggerRerender: !state.triggerRerender,
            };
        case actionTypes.SET_RESULTS_PER_PAGE:
            return {
                ...state,
                results_per_page: action.payload,
            };
        case actionTypes.SET_MESSAGE_TOAST:
            return {
                ...state,
                messageToast: [
                    ...state.messageToast,
                    { ...action.payload, id: uuidv4() },
                ],
            };
        case actionTypes.SET_CLEAR_MESSAGE_TOAST_BY_ID:
            return {
                ...state,
                messageToast: clearMessageToastById(
                    state.messageToast,
                    action.payload
                ),
            };
        case actionTypes.SET_BACKDROP:
            return {
                ...state,
                backdrop: {
                    open: action.payload.open,
                    child: {
                        component: action.payload.component,
                        isOpen: action.payload.isOpen,
                    },
                },
            };

        case actionTypes.SET_JAVASCRIPT_RESOURCES:
            return {
                ...state,
                javascript: action.payload,
            };
        case actionTypes.SET_BOOKS:
            return {
                ...state,
                books: action.payload,
            };
        case actionTypes.SET_CSS_RESOURCES:
            return {
                ...state,
                css: action.payload,
            };
        case actionTypes.SET_DATABASES_RESOURCES:
            return {
                ...state,
                databases: action.payload,
            };
        case actionTypes.SET_FUTURE_PROJECTS:
            return {
                ...state,
                futureProjects: action.payload,
            };
        case actionTypes.SET_NODEJS_RESOURCES:
            return {
                ...state,
                nodejs: action.payload,
            };
        case actionTypes.SET_NPM_PACKAGES:
            return {
                ...state,
                npmPackages: action.payload,
            };
        case actionTypes.SET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case actionTypes.SET_REACTJS_RESOURCES:
            return {
                ...state,
                reactjs: action.payload,
            };
        case actionTypes.SET_TESTING_RESOURCES:
            return {
                ...state,
                testing: action.payload,
            };
        case actionTypes.SET_OTHERS_RESOURCES:
            return {
                ...state,
                others: action.payload,
            };
        case actionTypes.SET_CURRENTLY_DISPLAYED_PROJECT:
            return {
                ...state,
                currentlyDisplayedProject: action.payload,
            };
        default:
            return state;
    }
};

const clearMessageToastById = (messageToast, id) => {
    return messageToast?.filter(toast => toast.id !== id);
};

export default reducer;

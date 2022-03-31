import { learningResourcesType } from '../context/learningResourcesType';

export const validateInput = (type, value) => {
    let error;
    switch (type) {
        case 'email':
            const validRegex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            error = value.match(validRegex) ? '' : 'Not a valid email';
            break;
        case 'password':
            error =
                value.length > 5
                    ? ''
                    : 'Password must be atleast 6 characters';
            break;
        case 'text':
            error = value.length > 0 ? '' : 'Please enter a search value';
            break;
        default:
            return '';
    }
    return error;
};

export const getLearningResourceType = resourceType => {
    switch (resourceType) {
        case 'javascript':
            return learningResourcesType.JAVASCRIPT;
        case 'npm-packages':
            return learningResourcesType.NPM_PACKAGES;
        case 'books':
            return learningResourcesType.BOOKS;
        case 'future-projects':
            return learningResourcesType.FUTURE_PROJECTS;
        case 'others':
            return learningResourcesType.OTHERS;
        case 'reactjs':
            return learningResourcesType.REACTJS;
        case 'css':
            return learningResourcesType.CSS;
        default:
            return '';
    }
};

//For Framer Motion

export const determinePageVariant = animationType => {
    let pageVariant;
    switch (animationType) {
        case 'left-to-right':
            return (pageVariant = {
                initial: { opacity: 0, x: '-100vw' },
                animate: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 50,
                    },
                },
                exit: {
                    opacity: 0,
                    x: '200vw',
                    transition: { duration: 0.3 },
                },
            });
        case 'top-to-bottom':
            return (pageVariant = {
                initial: { opacity: 0, y: '-100vh' },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.3,
                        type: 'spring',
                        stiffness: 50,
                    },
                },
                exit: {
                    opacity: 0,
                    y: '200vh',
                    transition: { duration: 0.3 },
                },
            });
        case 'left-to-right-1':
            return (pageVariant = {
                initial: { opacity: 0, x: '-100vw' },
                animate: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.4,
                    },
                },
                exit: {
                    opacity: 0,
                    x: '-100vw',
                    transition: { duration: 0.3 },
                },
            });
        case 'backdrop-portal':
            return (pageVariant = {
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 0.3 } },
                exit: { opacity: 0, transition: { duration: 0.3 } },
            });
        default:
            return pageVariant;
    }
};

import { Routes, Route } from 'react-router-dom';
import { HomePage, DisplayLearningResourceByType, Login } from './pages';
import { useAppContext } from './context/AppContext';
import { learningResourcesType } from './context/learningResourcesType';

const AppRouter = () => {
    const { applicationState } = useAppContext();
    const { user } = applicationState;
    const isUserLogged = component => {
        return user ? component : <Login />;
    };

    const resourcesRoutes = [
        {
            path: '/javascript',
            learningResourceType: learningResourcesType.JAVASCRIPT,
        },
        {
            path: '/npm-packages',
            learningResourceType: learningResourcesType.NPM_PACKAGES,
        },
        {
            path: '/books',
            learningResourceType: learningResourcesType.BOOKS,
        },
        {
            path: '/future-projects',
            learningResourceType: learningResourcesType.FUTURE_PROJECTS,
        },
        {
            path: '/others',
            learningResourceType: learningResourcesType.OTHERS,
        },
        {
            path: '/reactjs',
            learningResourceType: learningResourcesType.REACTJS,
        },
    ];

    const renderResourcesRoutes = resourcesRoutes.map(route => (
        <Route
            key={route.path}
            path={route.path}
            element={isUserLogged(
                <DisplayLearningResourceByType
                    learningResourceType={route.learningResourceType}
                />
            )}
        />
    ));

    return (
        <Routes>
            <Route path="/" element={isUserLogged(<HomePage />)} />
            <Route path="/login" element={isUserLogged(<Login />)} />
            {renderResourcesRoutes}
        </Routes>
    );
};

export default AppRouter;

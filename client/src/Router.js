import { Routes, Route, useNavigate } from 'react-router-dom';
import {
    DisplayLearningResourceByType,
    Login,
    Projects,
    ErrorPage,
} from './pages';
import { useAppContext } from './context/AppContext';
import { getLearningResourceType } from './utils';
import { useEffect } from 'react';

const AppRouter = () => {
    const navigate = useNavigate();
    const { applicationState } = useAppContext();
    const { user } = applicationState;
    const isUserLogged = component => {
        return user ? component : <Login />;
    };

    /*  useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, []); */

    const resourcesRoutes = [
        {
            path: '/login',
            component: <Login />,
        },
        {
            path: '/signup',
            component: <Login />,
        },
        {
            path: '/new-password',
            component: <Login />,
        },
        {
            path: '/javascript',
            component: (
                <DisplayLearningResourceByType
                    learningResourceType={getLearningResourceType(
                        'javascript'
                    )}
                />
            ),
        },
        {
            path: '/npm-packages',
            component: (
                <DisplayLearningResourceByType
                    learningResourceType={getLearningResourceType(
                        'npm-packages'
                    )}
                />
            ),
        },
        {
            path: '/books',
            component: (
                <DisplayLearningResourceByType
                    learningResourceType={getLearningResourceType('books')}
                />
            ),
        },
        {
            path: '/future-projects',
            component: (
                <DisplayLearningResourceByType
                    learningResourceType={getLearningResourceType(
                        'future-projects'
                    )}
                />
            ),
        },
        {
            path: '/others',
            component: (
                <DisplayLearningResourceByType
                    learningResourceType={getLearningResourceType(
                        'others'
                    )}
                />
            ),
        },
        {
            path: '/reactjs',
            component: (
                <DisplayLearningResourceByType
                    learningResourceType={getLearningResourceType(
                        'reactjs'
                    )}
                />
            ),
        },
        {
            path: '/css',
            component: (
                <DisplayLearningResourceByType
                    learningResourceType={getLearningResourceType('css')}
                />
            ),
        },
    ];

    const renderResourcesRoutes = resourcesRoutes.map(route => (
        <Route
            key={route.path}
            path={route.path}
            element={isUserLogged(route.component)}
        />
    ));

    return (
        <Routes>
            <Route
                path="projects"
                element={
                    <Projects
                        learningResourceType={getLearningResourceType(
                            'projects'
                        )}
                    />
                }
            />
            <Route path="*" element={<ErrorPage />} />
            {renderResourcesRoutes}
        </Routes>
    );
};

export default AppRouter;

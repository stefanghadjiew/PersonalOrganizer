import { Routes, Route } from 'react-router-dom';
import {
    HomePage,
    JavascriptResources,
    NpmPackages,
    Books,
    FutureProjects,
    Login,
    ReactJsResources,
    NodeJsResources,
    CSSResources,
    TestingResources,
    DatabasesResources,
    Projects,
    OtherResources,
} from './pages';
import { useAppContext } from './context/AppContext';

const AppRouter = () => {
    const { applicationState } = useAppContext();
    const { user } = applicationState;
    const isUserLogged = component => {
        return user ? component : <Login />;
    };

    return (
        <Routes>
            <Route path="/" element={isUserLogged(<HomePage />)} />
            <Route path="/login" element={isUserLogged(<Login />)} />
            <Route
                path="/javascript"
                element={isUserLogged(<JavascriptResources />)}
            />
            <Route
                path="/npm-packages"
                element={isUserLogged(<NpmPackages />)}
            />
            <Route path="/books" element={isUserLogged(<Books />)} />
            <Route
                path="/future-projects"
                element={isUserLogged(<FutureProjects />)}
            />
        </Routes>
    );
};

export default AppRouter;

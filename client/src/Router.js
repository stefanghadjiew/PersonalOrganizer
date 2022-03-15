import { Routes,Route } from "react-router-dom";
import {
    HomePage,
    LearningResources,
    NpmPackages,
    Books,
    FutureProjects,
    Login
} from './pages'
import { useAppContext } from "./context/AppContext";


const AppRouter = () => {
    const { applicationState } = useAppContext()
    const { user } = applicationState
    const isUserLogged = component => {
        return user 
            ?  component
            : <Login/>
    }

    return (
        <Routes>
            <Route path='/' element={isUserLogged(<HomePage/>)}/>
            <Route path='/login' element={isUserLogged(<Login />)}/>
            <Route path='/learning-resources' element={isUserLogged(<LearningResources/>)}/>
            <Route path='/npm-packages' element={isUserLogged(<NpmPackages/>)}/>
            <Route path='/books' element={isUserLogged(<Books/>)}/>
            <Route path='/future-projects' element={isUserLogged(<FutureProjects/>)}/>
        </Routes>
    )
}

export default AppRouter

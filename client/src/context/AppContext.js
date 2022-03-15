import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import { appState } from "./appState";

const AppContext = createContext({})

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = ({children}) => {
    const [applicationState, dispatch] = useReducer(reducer, appState)

    return (
        <AppContext.Provider value={{ applicationState, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

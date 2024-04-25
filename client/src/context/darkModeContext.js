import { createContext, useReducer } from "react"
import DarkModeReducer from "./darkModeReducer.js"

const INITIAL_STATE = {
    darkMode: false 
}

export const DarkModeContext = createContext(INITIAL_STATE)

export const DarkModeContextProvider = ({ children }) => {
    const [state, darkModeDispatch] = useReducer(DarkModeReducer, INITIAL_STATE)

    return (
        <DarkModeContext.Provider value={{ darkMode: state.darkMode, darkModeDispatch }}>
            {children}
        </DarkModeContext.Provider>
    )
}
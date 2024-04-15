import {createContext, useReducer} from 'react';
import { AuthReducer } from '../reducers/AuthReducer';


export const AuthContext = createContext();
export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, {user : null});
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
};
import {createContext, useEffect, useReducer} from 'react';
import { AuthReducer } from '../reducers/AuthReducer';
import api, { setAuthToken } from '../api';


export const AuthContext = createContext();
export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, {user : null});
    useEffect(()=>{
        const getUserData = async ()=>{
            try{
                const response = await api.get('/auth/user_data');
                console.log(response.data);
                dispatch({type: 'LOGIN', payload: {user: response.data}});
            } catch {
                dispatch({type : 'LOGOUT'});
            }
        }
        let success = setAuthToken();
        if(success){
            getUserData()
        } else {
            dispatch({type : 'LOGOUT'});
        }
      }, [])
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
};
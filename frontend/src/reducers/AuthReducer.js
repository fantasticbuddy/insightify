export const AuthReducer = (state, action) => {
    console.log(action);
    switch (action.type){
        case 'LOGIN':
            console.log(action);
            return {...state, user : action.payload.user}
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {...state, user : null}
        default:
            return state;
    }
}
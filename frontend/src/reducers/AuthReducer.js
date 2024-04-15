export const AuthReducer = (state, action) => {
    console.log(action);
    switch (action.type){
        case 'LOGIN':
            console.log(action);
            return {...state, user : action.payload.user}
        case 'LOGOUT':
            return {...state, user : null}
        default:
            return state;
    }
}
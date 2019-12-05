import actionTypes from '../Actions/actionTypes'

const initialState = { 
    loggedIn: false,
    loggingIn: false,
    user: null,
    token: null,
}

export default (state = initialState, action) => {
    switch(action.type){
        case (actionTypes.auth.beginLogin):
            return {
                ...state,
                loggingIn: true,
            }
        case (actionTypes.auth.loginSuccess):
            return {
                ...state,
                loggedIn: true,
                loggingIn: false,
                user: action.payload.user,
                token: action.payload.token
            }
        case (actionTypes.auth.loginFailure):
            return {
                ...state,
                loggedIn: false,
                loggingIn: false,
                user: null
            }
        case (actionTypes.auth.logout):
            return {
                ...state,
                loggedIn: false,
                user: null,
                token: null,
            }
        case (actionTypes.auth.updateUser):
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}
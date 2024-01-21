import {authAPI} from "../api/api";
import userPhoto from "../assets/images/oval.svg"
import {stopSubmit} from "redux-form";
// полезно для тестирования action(a) SET_AUTH_USER_AVATAR

const SET_USER_DATA = "SET-USER-DATA";
const SET_AUTH_USER_AVATAR = "SET-AUTH-USER-AVATAR";

let initialState = {
    data: {
        id: null,
        login: null,
        email: null,
        isAuth: false
    },
    authUserPhoto: null
    /*messages: [],
    fieldsErrors: [],
    resultCode: 0,
    isFetching: false*/
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                data: {...action.loginData}, //copy of {id, login, email, isAuth}
            }
        case SET_AUTH_USER_AVATAR:
            return {
                ...state,
                authUserPhoto: action.userAvatar
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, loginData: {id, login, email, isAuth} });
export const setAuthUserAvatar = (userAvatar) => ({ type: SET_AUTH_USER_AVATAR, userAvatar});

export const getAuthUserDataThunkCreator = () => {
    return (dispatch) => {
        authAPI.authUser().then(data => {
            if (data.resultCode === 0) {
                const {id, login, email} = data.data
                dispatch(setAuthUserData(id, login, email, true))
                authAPI.authUserPhotoAx(data.data.id).then(avatar => { // айдишник берем из data, которую нам вернула setAuthUserData
                    dispatch(setAuthUserAvatar(avatar));
                })};
        });
    }
}

export const loginTC = (email, password, rememberMe) => (dispatch) => {
        authAPI.login(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserDataThunkCreator())
            } else {
                const message = data.messages.length > 0 ? data.messages[0] : "Some error"
                const action = stopSubmit("login", {_error: message}) ///AC, который заготовили разработчики redux-form
                dispatch(action)
            }
        })
    }

export const logoutTC = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer;
import {authAPI, securityAPI} from "../api/api";
import userPhoto from "../assets/images/oval.svg"
import {stopSubmit} from "redux-form";
// полезно для тестирования action(a) SET_AUTH_USER_AVATAR

const SET_USER_DATA = "EPL-SN/auth/SET-USER-DATA";
const SET_AUTH_USER_AVATAR = "EPL-SN/auth/SET-AUTH-USER-AVATAR";
const GET_CAPTCHA_URL_SUCCESS = "EPL-SN/auth/GET-CAPTCHA-URL-SUCCESS";

let initialState = {
    data: {
        id: null,
        login: null,
        email: null,
        isAuth: false
    },
    authUserPhoto: null,
    captchaUrl: null //if null, then captchaUrl is not required
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
        // до диструктуризации
        // case SET_AUTH_USER_AVATAR:
        //     return {
        //         ...state,
        //         authUserPhoto: action.userAvatar
        //     }
        // case GET_CAPTCHA_URL_SUCCESS:
        //     return {
        //         ...state,
        //         captchaUrl: action.captchaUrl
        //     }
        //
        // после диструктуризации
        case SET_AUTH_USER_AVATAR:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, loginData: {id, login, email, isAuth} });
export const setAuthUserAvatar = (userAvatar) => ({ type: SET_AUTH_USER_AVATAR, payload: {userAvatar} });
export const getCaptcaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} });

//Promise до async await
// export const getAuthUserDataTC = () => {
//     return (dispatch) => {
//         return authAPI.authUser().then(data => {
//             if (data.resultCode === 0) {
//                 const {id, login, email} = data.data
//                 dispatch(setAuthUserData(id, login, email, true))
//                 authAPI.authUserPhotoAx(data.data.id).then(avatar => { // айдишник берем из data, которую нам вернула setAuthUserData
//                     dispatch(setAuthUserAvatar(avatar));
//                 })};
//         });
//     }
// }

export const getAuthUserDataTC = () => {
    return async (dispatch) => {
        const data = await authAPI.authUser();
        if (data.resultCode === 0) {
            const {id, login, email} = data.data;
            dispatch(setAuthUserData(id, login, email, true));
            const avatar = await authAPI.authUserPhotoAx(data.data.id);
            dispatch(setAuthUserAvatar(avatar));
        }
    }
}

// export const loginTC = (email, password, rememberMe) => (dispatch) => {
//         authAPI.login(email, password, rememberMe).then(data => {
//             if (data.resultCode === 0) {
//                 dispatch(getAuthUserDataTC())
//             } else {
//                 const message = data.messages.length > 0 ? data.messages[0] : "Some error"
//                 const action = stopSubmit("login", {_error: message}) ///AC, который заготовили разработчики redux-form
//                 dispatch(action)
//             }
//         })
//     }

export const loginTC = (email, password, rememberMe, captcha) => async (dispatch, getState) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    const captchaUrl = getState().authUserBro.captchaUrl
        if (data.resultCode === 0) {
            dispatch(getAuthUserDataTC())
            captchaUrl && dispatch(getCaptcaUrlSuccess(null))
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrlTC())
            }
            const message = data.messages.length > 0 ? data.messages[0] : "Some error"
            const action = stopSubmit("login", {_error: message}) ///AC, который заготовили разработчики redux-form
            dispatch(action)
        }
}

export const getCaptchaUrlTC = () => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url
    
    dispatch(getCaptcaUrlSuccess(captchaUrl))
}

// export const logoutTC = () => {
//     return (dispatch) => {
//         authAPI.logout()
//             .then(data => {
//             if (data.resultCode === 0) {
//                 dispatch(setAuthUserData(null, null, null, false))
//             }
//         })
//     }
// }

export const logoutTC = () => async (dispatch) => {
    const data = await authAPI.logout()
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export default authReducer;
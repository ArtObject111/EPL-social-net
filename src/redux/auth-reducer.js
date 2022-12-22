import {authAPI} from "../api/api";
import userPhoto from "../assets/images/oval.svg"// полезно для тестирования action(a) SET_AUTH_USER_AVATAR

const SET_USER_DATA = "SET-USER-DATA";
const SET_AUTH_USER_AVATAR = "SET-AUTH-USER-AVATAR";

let initialState = {
    data: {
        id: null,
        login: null,
        email: null,
        isAuth: true
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
                data: {...action.data, isAuth: true}, //...{id, login, email}
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

export const setAuthUserData = (data) => ({type: SET_USER_DATA, data});
export const setAuthUserAvatar = (userAvatar) => ({ type: SET_AUTH_USER_AVATAR, userAvatar});

export const getAuthUserDataThunkCreator = () => {
    return (dispatch) => {
        authAPI.authUser().then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(data.data))
                authAPI.authUserPhotoAx(data.data.id).then(avatar => { // айдишник берем из data, которую нам вернула setAuthUserData
                    dispatch(setAuthUserAvatar(avatar));
                })};
        });
    }
}

export default authReducer;
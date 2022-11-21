
const SET_USER_DATA = "SET-USER-DATA";
const SET_AUTH_USER_AVATAR = "SET-AUTH-USER-AVATAR";

let initialState = {
    data: {
        id: null,
        login: null,
        email: null,
        isAuth: false,
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

export const setAuthUserData = (data) => ({type: "SET-USER-DATA", data});
export const setAuthUserAvatar = (userAvatar) => ({ type: "SET-AUTH-USER-AVATAR", userAvatar});


export default authReducer;
const SET_USER_DATA = "SET-USER-DATA";
const SET_AUTH_USER_DESCRIPTION = "SET-AUTH-USER-DESCRIPTION";

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
        case SET_AUTH_USER_DESCRIPTION:
            return {
                ...state,
                authUserPhoto: action.userPhoto
            }
        default:
            return state;
    }
}

export const setAuthUserData = (data) => ({type: "SET-USER-DATA", data});
export const setAuthUserDescription = (userPhoto) => ({type: "SET-AUTH-USER-DESCRIPTION", userPhoto});


export default authReducer;
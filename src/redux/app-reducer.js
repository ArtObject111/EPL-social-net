import {getAuthUserDataTC} from "./auth-reducer";

const SET_SUCCESS_INITIALIZATION = "SET-SUCCESS-INITIALIZATION";

let initialState = {
    isInitialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUCCESS_INITIALIZATION:
            return {
                ...state,
                isInitialized: true
            }
        default: {
            return state
        }
    }
}

export const setSuccessInitialization = () => ({type: SET_SUCCESS_INITIALIZATION});

export const initializeAppTC = () => (dispatch) => {
    const promise = dispatch(getAuthUserDataTC())
    dispatch(getAuthUserDataTC())
    Promise.all([promise]).then(() => {
        dispatch(setSuccessInitialization())
    })
}

export default appReducer;
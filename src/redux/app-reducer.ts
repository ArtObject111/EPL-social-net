import {getAuthUserDataTC} from "./auth-reducer";

const SET_SUCCESS_INITIALIZATION = "EPL-SN/app/SET-SUCCESS-INITIALIZATION";

type InitialStateType = {
    isInitialized: boolean
}

let initialState: InitialStateType = {
    isInitialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type SetSuccessInitializationActionType = {
    type: typeof SET_SUCCESS_INITIALIZATION //"SET-SUCCESS-INITIALIZATION"
}

export const setSuccessInitialization = (): SetSuccessInitializationActionType => ({type: SET_SUCCESS_INITIALIZATION});

export const initializeAppTC = () => (dispatch: any ) => {
    const promise = dispatch(getAuthUserDataTC())
    dispatch(getAuthUserDataTC())
    Promise.all([promise]).then(() => {
        dispatch(setSuccessInitialization())
    })
}

export default appReducer;
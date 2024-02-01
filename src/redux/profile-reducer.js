import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"


let initialState = {
    postsData :[
        {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
        {id: 2, message: "I support Aston Willa", likesCount: 7}
    ],
    profile: null,
    status: "",
    profilesData: {
        aboutMe: null,
        contacts: {
            facebook:null ,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: null,
        lookingForAJobDescription: null,
        fullName: null,
        userId: 0
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 10,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                newPostText: "",
                postsData: [...state.postsData, newPost]
            };
        case DELETE_POST:
            return {
                ...state,
                postsData: [...state.postsData.filter(post => post.id !== action.id)]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile //заменили profile stat(а), на profile, который пришел в action
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}

//блок Action Creators
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});// сокращенная запись
export const deletePostActionCreator = (id) => ({type: DELETE_POST, id});// сокращенная запись
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatusActionCreator = (status) => ({type: SET_STATUS, status})

//блок санок
export const getUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getUserProfileAx(userId).then(data => {
            dispatch(setUserProfile(data));
        });

    }
}

export const getStatusThunkCreator = (userId) => (dispatch) => {
    profileAPI.getUserStatus(userId)
        .then(data => {
        dispatch(setStatusActionCreator(data))
    })
}

export const updateStatusThunkCreator = (status) => (dispatch) => {
    profileAPI.updateUserStatus(status).then(data => {
        if (data.resultCode === 0) {
            dispatch(setStatusActionCreator(status))
        }
    })
}

export default profileReducer;
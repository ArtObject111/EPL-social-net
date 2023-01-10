import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_STATUS = "SET-STATUS"


let initialState = {
    postsData :[
        {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
        {id: 2, message: "I support Aston Willa", likesCount: 7}
    ],
    newPostText: "shkaf",
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
                message: state.newPostText,
                likesCount: 0
            };
            //state.postsData.push(newPost); //до копирования объекта
            return {
                ...state,
                newPostText: "",
                postsData: [...state.postsData, newPost]
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
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
export const addPostActionCreator = () => ({type: ADD_POST});// сокращенная запись
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const updateNewPostTextActionCreator = (postText) => { //старый способ записи
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: postText
    }
}
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
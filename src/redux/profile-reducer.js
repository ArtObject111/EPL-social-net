import {usersAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE"


let initialState = {
    postsData :[
        {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
        {id: 2, message: "I support Aston Willa", likesCount: 7}
    ],
    newPostText: "shkaf",
    profile: null,
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
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});// сокращенная запись
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const updateNewPostTextActionCreator = (postText) => { //старый способ записи
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: postText
    }
}

//блок санок
export const getUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        usersAPI.getUserProfileAx(userId).then(data => {
            dispatch(setUserProfile(data));
        });

    }
}

export default profileReducer;
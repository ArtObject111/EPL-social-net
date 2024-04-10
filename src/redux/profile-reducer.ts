import { ResultCodesEnum, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { setAuthUserAvatar } from "./auth-reducer";

const ADD_POST = "EPL-SN/profilePage/ADD-POST";
const DELETE_POST = "EPL-SN/profilePage/DELETE-POST";
const SET_USER_PROFILE = "EPL-SN/profilePage/SET-USER-PROFILE"
const SET_STATUS = "EPL-SN/profilePage/SET-STATUS"
const SET_PHOTO = "EPL-SN/profilePage/SET-PHOTO"

let initialState = {
    status: null as string | null,
    postsData :[
        {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
        {id: 2, message: "I support Aston Willa", likesCount: 7}
    ] as Array<PostType>,
    profile: null as ProfileType | null
    // profile: {
    //     aboutMe: null as string | null,
    //     lookingForAJob: null as boolean | null,
    //     lookingForAJobDescription: null as string | null,
    //     fullName: null as string | null,
    //     userId: null as number | null,
    //     contacts: {
    //         facebook:null as string | null,
    //         website: null as string | null,
    //         vk: null as string | null,
    //         twitter: null as string | null,
    //         instagram: null as string | null,
    //         youtube: null as string | null,
    //         github: null as string | null,
    //         mainLink: null as string | null
    //     },
    //     photos: {
    //         small: null as string | null,
    //         large: null as string | null
    //     }
    // },
    // profilesData: {
    //     aboutMe: null,
    //     contacts: {
    //         facebook:null ,
    //         website: null,
    //         vk: null,
    //         twitter: null,
    //         instagram: null,
    //         youtube: null,
    //         github: null,
    //         mainLink: null
    //     },
    //     lookingForAJob: null,
    //     lookingForAJobDescription: null,
    //     fullName: null,
    //     userId: 0
    // }
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any ): InitialStateType  => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 10,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
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
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType //ожидаем объект photos: {large: "url", small: "url"} в соответсвии с API
            }
        default:
            return state;
    }
}

//блок Action Creators
type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}

type DeletePostActionType = {
    type: typeof DELETE_POST,
    id: number
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}

type SetPhotoActionType = {
    type: typeof SET_PHOTO,
    photos: PhotosType
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});// сокращенная запись
export const deletePostActionCreator = (id: number): DeletePostActionType => ({type: DELETE_POST, id});// сокращенная запись
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});
export const setStatusActionCreator = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const setPhotoActionCreator = (photos: PhotosType): SetPhotoActionType => ({type: SET_PHOTO, photos})

//блок санок
export const getUserProfileThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getUserProfileAx(userId).then(data => {
            dispatch(setUserProfile(data));
        });

    }
}

export const getStatusThunkCreator = (userId: number) => (dispatch: any) => {
    profileAPI.getUserStatus(userId)
        .then(data => {
        dispatch(setStatusActionCreator(data))
    })
}

export const updateStatusThunkCreator = (status: string) => async (dispatch: any) => {
    try {
        const data = await profileAPI.updateUserStatus(status)
    
        if (data.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setStatusActionCreator(status))
        }
    } catch (error) {
        console.error("error: " + error)
   }
}

export const updatePhotoThunkCreator = (photoFile: any) => async (dispatch: any) => {
    const data = await profileAPI.updateUserPhoto(photoFile)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setPhotoActionCreator(data.data.photos))
            dispatch(setAuthUserAvatar(data.data.photos.small))
        }
}

export const updateProfileThunkCreator = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().authUserBro.data.id
    const data = await profileAPI.updateUserProfile(profile)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getUserProfileThunkCreator(userId))
        }
        else {
            dispatch(stopSubmit("edit-profile", {_error: data.messages[0]})) ///AC, который заготовили разработчики redux-form
                                                                             //стоит распарсить строку ошибки
            return Promise.reject(data.messages[0])
        }
}

export default profileReducer;
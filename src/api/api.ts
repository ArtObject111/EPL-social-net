//DAL (Data Acces Layer) -- this is layer to interact with API. Уровень доступа к данным для
// взаимодействия с API

import axios from "axios";
import { PhotosType, ProfileType, UserType } from "../types/types";

const instance = axios.create({ //переменная instance для передачм параметров в axios
    withCredentials:true, //параметр нужен для привязки cookies
    baseURL: `https://social-network.samuraijs.com/api/1.0/`, //базовый URL
    headers: {
        "API-KEY": "69d028e6-b9b8-4a10-ae69-de98bcdc80eb" //ключ для верификации авторизованного пользователя
    }
});

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

type FollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type UnfollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const usersAPI = { //вспомогаьельный объект, содержащий методы для работы с ajax запросами
    getUsers (currentPage: number, pageSize: number) {// запихнули метод в объект usersAPI
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            }) //promise возвразает только те данные,
               // которые нужно передать компоненте после вызова getUsers()
    },
    unfollowUser (userId: number) {
        return instance.delete<UnfollowResponseType>(`follow/` + userId)
            .then(response => {
                return response.data
            })
    },
    followUser (userId: number) {
        return instance.post<FollowResponseType>(`follow/` + userId)
            .then(response => response.data) //более краткая запись responc(a)
    }
}

type UserResponseType = {
    aboutMe: string
    contacts: {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
        mainLink: string | null
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: PhotosType
}

type UpdateUserStatusResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

type UpdateUserPhotoResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {
        photos: PhotosType
    }
}

type UpdateUserProfileResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const profileAPI = {
    getUserProfileAx (userId: number) {
        return instance.get<UserResponseType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus (userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateUserStatus (status: string) {
        return instance.put<UpdateUserStatusResponseType>(`profile/status`, {status: status})
    },
    updateUserPhoto (photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<UpdateUserPhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    updateUserProfile (profile: ProfileType) {
        return instance.put<UpdateUserProfileResponseType>(`profile`, profile).then(response => response.data)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    Captcha = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    authMe () {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },
    authUserPhotoAx (userId: number) {
        //26748
        return instance.get<UserResponseType>(`profile/${userId}`)
            .then(response => response.data.photos.small)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null ) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(response => response.data)
    }
}

type securityResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl () {
        return instance.get<securityResponseType>(`security/get-captcha-url`)
            .then(response => response.data)
    }
}

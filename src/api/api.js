//DAL (Data Acces Layer) -- this is layer to interact with API. Уровень доступа к данным для
// взаимодействия с API

import axios from "axios";

const instance = axios.create({ //переменная instanse для передачм параметров в axios
    withCredentials:true, //параметр нужен для привязки cookies
    baseURL: `https://social-network.samuraijs.com/api/1.0/`, //базовый URL
    headers: {
        "API-KEY": "69d028e6-b9b8-4a10-ae69-de98bcdc80eb" //ключ для верификации авторизованного пользователя
    }
});

export const usersAPI = { //вспомогаьельный объект, содержащий методы для работы с ajax запросами
    getUsers (currentPage, pageSize) {// запихнули метод в объект usersAPI
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            }) //promise возвразает только те данные,
               // которые нужно передать компоненте после вызова getUsers()
    },
    unfollowUser (userId) {
        return instance.delete(`follow/` + userId)
            .then(response => {
                return response.data
            })
    },
    followUser (userId) {
        return instance.post(`follow/` + userId)
            .then(response => response.data) //более краткая запись responc(a)
    }
}

export const profileAPI = {
    getUserProfileAx (userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus (userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateUserStatus (status) {
        return instance.put(`profile/status`, {status: status})
            .then(response => response.data)
    },
}

export const authAPI = {
    authUser () {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    authUserPhotoAx (userId) {
        //26748
        return instance.get(`profile/${userId}`)
            .then(response => response.data.photos.small)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    }
}

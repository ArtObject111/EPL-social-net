//DAL (Data Acces Layer) -- this is layer to interact with API. Уровень доступа к данным для взаимодействия с API

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
            .then(responce => {
                return responce.data
            }) //promise возвразает только те данные,
               // которые нужно передать компоненте после вызова getUsers()
    },
    unfollowUser (userId) {
        return instance.delete(`follow/` + userId)
            .then(responce => {
                return responce.data
            })
    }, followUser (userId) {
        return instance.post(`follow/` + userId)
            .then(responce => responce.data) //более краткая запись responc(a)
    },
    authUser () {
        return instance.get(`auth/me`)
            .then(responce => responce.data)
    },
    authUserPhotoAx (userId) {
        return instance.get(`profile/${userId}`)
            .then(responce => responce.data.photos.small)
    }
}
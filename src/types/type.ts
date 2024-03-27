//profile
export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
}

export type ProfileType = {
    aboutMe: string | null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    userId: number,
    contacts: ContactsType,
    photos: PhotosType
}

export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

//users
export type UserType = {
    name: string,
    id: number | null,
    uniqueUrlName: number | null,
    status: string | null,
    followed: boolean,
    photos: PhotosType
}
import {createSelector} from "reselect";
import { AppStateType } from "./redux-store";

const getUsersPrimitiveSelector = (state: AppStateType) => {
    return state.usersPage.usersData;
}

export const getUsers = createSelector( getUsersPrimitiveSelector, (users) => {
    return users.filter( u => true);
} )

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}


export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}

export const getPageBarLength = (state: AppStateType) => {
    return state.usersPage.pageBarLength;
}

export const getPageBar = (state: AppStateType) => {
    return state.usersPage.pageBar;
}

export const getCountFlip = (state: AppStateType) => {
    return state.usersPage.countFlip;
}
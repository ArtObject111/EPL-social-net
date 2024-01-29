import {createSelector} from "reselect";

const getUsersPrimitiveSelector = (state) => {
    return state.usersPage.usersData;
}

export const getUsers = createSelector( getUsersPrimitiveSelector, (users) => {
    debugger
    return users.filter( u => true);
} )

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}


export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}

export const getPageBarLength = (state) => {
    return state.usersPage.pageBarLength;
}

export const getPageBar = (state) => {
    return state.usersPage.pageBar;
}

export const getCountNext = (state) => {
    return state.usersPage.countNext;
}

export const getCountBack = (state) => {
    return state.usersPage.countBack;
}

export const getCountFlip = (state) => {
    return state.usersPage.countFlip;
}
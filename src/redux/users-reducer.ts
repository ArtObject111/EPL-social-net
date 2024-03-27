import { usersAPI } from "../api/api";
import { UserType } from "../types/type";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "EPL-SN/usersPage/FOLLOW";
const UNFOLLOW = "EPL-SN/usersPage/UNFOLLOW";
const SET_USERS = "EPL-SN/usersPage/SET-USERS";
const SET_CURRENT_PAGE = "EPL-SN/usersPage/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "EPL-SN/usersPage/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "EPL-SN/usersPage/TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "EPL-SN/usersPage/TOGGLE-IS-FOLLOWING-IN-PROGRESS";
const SET_PAGE_BAR = "EPL-SN/usersPage/SET-PAGE-BAR";
const FLIP_NEXT = "EPL-SN/usersPage/FLIP-NEXT";
const FLIP_BACK = "EPL-SN/usersPage/FLIP-BACK";

let initialState = {
    totalUsersCount: null as number | null,
    pageSize: 5 as number,
    pageBarLength: 20 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number> | [], //array of users ids
    pageBar: [] as Array<number> | [],
    countFlip: 1 as number,
    usersData: [] as Array<UserType> | [],
    fake: 0
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "FAKE": return {...state, fake: state.fake + 1}
        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userID, "id", {followed: true})
                // usersData: state.usersData.map(u => { //код до object-helpers
                //     if (u.id === action.userID) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            };

        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userID, "id", {followed: false})
            };

        case SET_USERS:
            return {
                ...state,
                usersData: [...action.users]
            }
        case SET_PAGE_BAR:
            return {
                ...state,
                pageBar: action.pagesData
            }
        case FLIP_NEXT:
            return {
                ...state,
                pageBar: action.pageBarNext,
                countFlip: action.count
            }
        case FLIP_BACK:
            return {
                ...state,
                pageBar: action.pageBarBack,
                countFlip: action.count
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPageNumber
            } //у экшена свойство currentPage
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching                               // если в экшене приходит true, то добавляем id в массив followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : [state.followingInProgress.filter(id => id !== action.userID)] //при false удаляем id из массива followingInProgress
            }

        default:
            return state;
    }
}

//блок actionCreators
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching: boolean,
    userID: number
}
export const toggleFollowingInProgress = (isFetching: boolean, userID: number): ToggleFollowingInProgressActionType => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userID})

type FollowBroSuccessActionType = {
    type: typeof FOLLOW,
    userID: number
}
export const followBroSuccess = (userID: number): FollowBroSuccessActionType => ({type: FOLLOW, userID})

type UnfollowBroSuccessActionType = {
    type: typeof UNFOLLOW,
    userID: number
}
export const unfollowBroSuccess = (userID: number): UnfollowBroSuccessActionType => ({type: UNFOLLOW, userID})

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: object
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

type SetPageBarActionType = {
    type: typeof SET_PAGE_BAR,
    pagesData: Array<number>
}
export const setPageBar = (pagesData: Array<number>): SetPageBarActionType => ({type: SET_PAGE_BAR, pagesData})

type FlipNextActionType = {
    type: typeof FLIP_NEXT,
    pageBarNext: Array<number>,
    count: number
}
export const flipNext = (pageBarNext: Array<number>, count: number): FlipNextActionType => ({type: FLIP_NEXT, pageBarNext, count})

type FlipBackActionType = {
    type: typeof FLIP_BACK,
    pageBarBack: Array<number>,
    count: number
}
export const flipBack = (pageBarBack: Array<number>, count: number): FlipBackActionType => ({type: FLIP_BACK, pageBarBack, count})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPageNumber: number
}
export const setCurrentPage = (currentPageNumber: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPageNumber})

//блок thunkCreators
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => { //- это thunk
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
}

export const setCurrentPageThunkCreator = (pageNumber: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(pageNumber));
    const data = await usersAPI.getUsers(pageNumber, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
}

const followUnfollowFlow = async (dispatch: any, userID: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(true, userID))
    const data = await apiMethod(userID)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingInProgress(false, userID))
}

export const followBroThunkContainer = (userID: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.followUser.bind(usersAPI);
    await followUnfollowFlow(dispatch, userID, apiMethod, followBroSuccess)
}

export const unfollowBroThunkContainer = (userID: number) => async (dispatch: any) => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI);
    await followUnfollowFlow(dispatch, userID, apiMethod, unfollowBroSuccess)
}

export default usersReducer;
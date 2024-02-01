import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE-IS-FOLLOWING-IN-PROGRESS";
const SET_PAGE_BAR = "SET-PAGE-BAR";
const FLIP_NEXT = "FLIP-NEXT";
const FLIP_BACK = "FLIP-BACK";

let initialState = {
    totalUsersCount: 0,
    pageSize: 5,
    pageBarLength: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    pageBar: [],
    countFlip: 1,
    usersData: [
        /*{
            id: 1,
            photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
            followed: false,
            fullName: "Bukayo Saka",
            status: "I'm Arsenal player!",
            location: {city: "London", country: "England"}
        },
        {
            id: 2,
            photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
            followed: true,
            fullName: "Emile Smith Rowe",
            status: "I'm Arsenal player!",
            location: {city: "London", country: "England"}
        },
        {
            id: 3,
            photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
            followed: false,
            fullName: "Gabriel Martinelli",
            status: "I'm Arsenal player!",
            location: {city: "Guarulhos", country: "Brazil"}
        },
        {
            id: 4,
            photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
            followed: true,
            fullName: "Martin Ødegaard",
            status: "I'm Arsenal player!",
            location: {city: "Drammen", country: "Norway"}
        },
        {
            id: 5,
            photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
            followed: true,
            fullName: "Gabriel Jesus",
            status: "I'm Arsenal player!",
            location: {city: "Sao Paulo", country: "Brazil"}
        },*/
    ],
    fake: 10
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        // case "FAKE": return {...state, fake: state.fake + 1}
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    };
                    return u;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    };
                    return u;
                })
            };

        case SET_USERS:
            return {
                ...state,
                usersData: [...action.users]
            }
        case SET_PAGE_BAR://лишнее
            return {
                ...state,
                pageBar: action.pagesData
            }
            case FLIP_NEXT://лишнее
            return {
                ...state,
                pageBar: action.pageBarNext,
                countFlip: action.count
            }
            case FLIP_BACK://лишнее
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
                totalUsersCount: action.count
            }
            case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching// если в экшене приходит true, то добавляем id в массив followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : [state.followingInProgress.filter(id => id !== action.userID)] //при false удаляем id из массива followingInProgress
            }

        default:
            return state;
    }
}

//блок actionCreators
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingInProgress = (isFetching, userID) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userID})
export const followBroSuccess = (userID) => ({type: FOLLOW, userID})// сокращенная запись
export const unfollowBroSuccess = (userID) => ({type: UNFOLLOW, userID})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setTotalUsersCount = (totalUsers) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsers})//здесь специально по-разному назвал переменные
export const setPageBar = (pagesData) => ({type: SET_PAGE_BAR, pagesData})
export const flipNext = (pageBarNext, count) => ({type: FLIP_NEXT, pageBarNext, count})
export const flipBack = (pageBarBack, count) => ({type: FLIP_BACK, pageBarBack, count})
export const setCurrentPage = (currentPageNumber) => ({type: SET_CURRENT_PAGE, currentPageNumber}) //currentPage должен
//быть равен свойству этого экшена
//в reducer(е)


//блок thunkCreators
export const getUsersThunkCreator = (currentPage, pageSize) => { //- это thunkCreator
    return (dispatch) => { //- это thunk
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => { //ajax запрос
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export const setCurrentPageThunkCreator = (pageNumber, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(pageNumber));
    usersAPI.getUsers(pageNumber, pageSize).then(data => { //ajax запрос
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
    });
}

export const followBroThunkContainer = (userID) => { //thunk - функция, которая диспатчит в себе обычных экшенов
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userID))
        usersAPI.followUser(userID).then(data => {
            if (data.resultCode === 0) {
                dispatch(followBroSuccess(userID))
            };
            dispatch(toggleFollowingInProgress(false, userID))
        });
    }

}

export const unfollowBroThunkContainer = (userID) => (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userID))
        usersAPI.unfollowUser(userID).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowBroSuccess(userID))
            };
            dispatch(toggleFollowingInProgress(false, userID))
        });
    }

export default usersReducer;
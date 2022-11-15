const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";

let initialState = {
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
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
    ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    ;
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
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
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

        default:
            return state;
    }
}

export const toggleIsFetching = (isFetching) => ({type: "TOGGLE-IS-FETCHING", isFetching})
export const followbro = (userID) => ({type: "FOLLOW", userID})// сокращенная запись
export const unfollowbro = (userID) => ({type: "UNFOLLOW", userID})// сокращенная запись
export const setUsers = (users) => ({type: "SET-USERS", users})
export const setTotalUsersCount = (totalUsers) => ({type: "SET-TOTAL-USERS-COUNT", count: totalUsers})//здесь специально по-разному назвал переменные
export const setCurrentPage = (currentPage) => ({type: "SET-CURRENT-PAGE", currentPage}) //currentPage должен
//быть равен свойству этого экшена
//в reducer(е)
export default usersReducer;
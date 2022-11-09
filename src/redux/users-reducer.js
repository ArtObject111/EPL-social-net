const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

let initialState = {
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
                usersData: [...state.usersData, ...action.users]
            }

        default:
            return state;
    }
}

export const followActionCreator = (userID) => ({type: "FOLLOW", userID})// сокращенная запись
export const unfollowActionCreator = (userID) => ({type: "UNFOLLOW", userID})// сокращенная запись
export const setUsersActionCreator = (users) => ({type: "SET-USERS", users})

export default usersReducer;
const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    postsData: [
        {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
        {id: 2, message: "I support Aston Willa", likesCount: 7}
    ],
    newPostText: "shkaf"
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 10,
                message: state.newPostText,
                likesCount: 0
            };
            //state.postsData.push(newPost); //до копирования объекта
            return {
                ...state,
                newPostText: "",
                postsData: [...state.postsData, newPost]
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: "ADD-POST"})// сокращенная запись

export const updateNewPostTextActionCreator = (postText) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: postText
    }
}

export default profileReducer;
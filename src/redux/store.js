import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
                {id: 2, message: "I support Aston Willa", likesCount: 7}
            ],
            newPostText: "shkaf"
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: "Bukayo Saka"},
                {id: 2, name: "Emile Smith Rowe"},
                {id: 3, name: "Gabriel Martinelli"},
                {id: 4, name: "Martin Ødegaard"},
                {id: 5, name: "Gabriel Jesus"}
            ],

            messagesData: [
                {id: 1, message: "I play for Arsenal"},
                {id: 2, message: "What position do you play on?"},
                {id: 3, message: "What football team we meet on next weekends with?"}
            ],
            newMessageText: "Good morning!"
        }
    },

    _callSubscriber () {
        console.log("state has been changed")
    },


    getState() {
        return this._state;
    },

    subscribe (observer) {
        this._callSubscriber = observer; //наблюдатель - это паттерн
    },


    dispatch (action) { // type: "ADD-POST"
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    }
}

window.store = store;

export default store;
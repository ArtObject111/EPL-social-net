import React from "react";

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
        if (action.type === "ADD-POST") {
            let newPost = {
                id: 10,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === "UPDATE-NEW-POST-TEXT") {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === "SEND-MESSAGE") {
            let newMessage = {
                id: 10,
                message: this._state.dialogsPage.newMessageText
            };
            this._state.dialogsPage.messagesData.push(newMessage);
            this._state.dialogsPage.newMessageText = "";
            this._callSubscriber(this._state);
        } else if (action.type === "SEND-MESSAGE") {
            let newMessage = {
                id: 10,
                message: this._state.dialogsPage.newMessageText
            };
            this._state.dialogsPage.messagesData.push(newMessage);
            this._state.dialogsPage.newMessageText = "";
            this._callSubscriber(this._state);
        } else if (action.type === "UPDATE-NEW-MESSAGE-TEXT") {
            this._state.dialogsPage.newMessageText = action.newMessage;
            this._callSubscriber(this._state);
        }
    }
}

window.store = store;

export default store;
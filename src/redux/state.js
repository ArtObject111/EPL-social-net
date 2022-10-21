import React from "react";

let rerenderEntireTree = () => {
    console.log("state has been changed")
};

let state = {
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
};

window.state = state;

export const addPost = () => {
    let newPost = {
        id: 10,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.postsData.push(newPost);
    state.profilePage.newPostText = "";
    rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
};

export const sendMessage = () => {
    debugger;
    let newMessage = {
        id: 10,
        message: state.dialogsPage.newMessageText
    };
    state.dialogsPage.messagesData.push(newMessage);
    state.dialogsPage.newMessageText = "";
    rerenderEntireTree(state);

};

export const updateNewMessageText = (newMessage) => {
    state.dialogsPage.newMessageText = newMessage;
    rerenderEntireTree(state);
};

export const subscribe = (observer) => {
    rerenderEntireTree = observer; //наблюдатель - это паттерн
}

export default state;
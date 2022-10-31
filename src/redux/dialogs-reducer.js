const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
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

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 10,
                message: state.newMessageText
            };
            state.messagesData.push(newMessage);
            state.newMessageText = "";
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;
        default:
            return state;
    }
}

export const sendMessageActionCreator = () => {
    return {
        type: "SEND-MESSAGE"
    }
}

export const updateNewMessageTextActionCreator = (messageText) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newText: messageText
    }
}

export default dialogsReducer;
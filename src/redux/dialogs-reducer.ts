const SEND_MESSAGE = "EPL-SN/dialogsPage/SEND-MESSAGE";

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogsData: [
        {id: 1, name: "Bukayo Saka"},
        {id: 2, name: "Emile Smith Rowe"},
        {id: 3, name: "Gabriel Martinelli"},
        {id: 4, name: "Martin Ødegaard"},
        {id: 5, name: "Gabriel Jesus"}
    ] as Array<DialogType>,

    messagesData: [
        {id: 1, message: "I play for Arsenal"},
        {id: 2, message: "What position do you play on?"},
        {id: 3, message: "What football team we meet on next weekends with?"}
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 10,
                message: action.newMessageBody
            };
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        default:
            return state;
    }
}

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageActionCreator = (newMessageBody: string): SendMessageActionCreatorType => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}

export default dialogsReducer;
import React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    let state = props.store.getState();

    let onSendMessage = () => {
        props.store.dispatch(sendMessageActionCreator());
    }

    let onMessageChange = (messageText) => {
        let action = updateNewMessageTextActionCreator(messageText);
        props.store.dispatch(action);
    }


    return (<Dialogs
       dialogsData={state.dialogsPage.dialogsData}
        messagesData={state.dialogsPage.messagesData}
        newMessageText={state.dialogsPage.newMessageText}
        sendMessage={onSendMessage}
        updateNewMessageText={onMessageChange}

    />)
}

export default DialogsContainer;
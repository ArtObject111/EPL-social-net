import React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {

    return <StoreContext.Consumer>
            {
                store => {
                    let state = store.getState().dialogsPage;

                    let onSendMessage = () => {
                        store.dispatch(sendMessageActionCreator());
                    }

                    let onMessageChange = (messageText) => {
                        let action = updateNewMessageTextActionCreator(messageText);
                        store.dispatch(action);
                    }
                    return <Dialogs
                        dialogsPage={state}
                        sendMessage={onSendMessage}
                        updateNewMessageText={onMessageChange}/>
                }
            }
        </StoreContext.Consumer>
}

export default DialogsContainer;
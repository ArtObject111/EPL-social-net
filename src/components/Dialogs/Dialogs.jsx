import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Navigate} from "react-router-dom";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogsData.map(dialogs =>
        <DialogItem name={dialogs.name} id={dialogs.id}/>);
    let messagesElements = props.dialogsPage.messagesData.map(messages =>
        <MessageItem message={messages.message} id={messages.id}/>);

    let newMessageElement = React.createRef();

    let onSendMessage = () => {
        props.sendMessage();
    }

    let onMessageChange = (e) => {
        let messageText = newMessageElement.current.value;
        props.updateNewMessageText(messageText);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <div className={s.sendMessageBlock}>
                    <textarea onChange={onMessageChange} ref={newMessageElement}
                    value={props.dialogsPage.newMessageText} placeholder={"Enter your message"}/> <br/>
                    <button onClick={onSendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";

const Dialogs = (props) => {
    let dialogsElements = props.dialogsData.map(dialogs =>
        <DialogItem name={dialogs.name} id={dialogs.id}/>);
    let messagesElements = props.messagesData.map(messages =>
        <MessageItem message={messages.message} id={messages.id}/>);

    let newMessageElement = React.createRef();

    let sendMessage = () => {
        //props.sendMessage();
        props.dispatch(sendMessageActionCreator());
    }

    let onMessageChange = () => {
        let messageText = newMessageElement.current.value;
        //props.updateNewMessageText(text);
        let action = updateNewMessageTextActionCreator(messageText);
        props.dispatch(action)
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
                    value={props.newMessageText}/> <br/>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
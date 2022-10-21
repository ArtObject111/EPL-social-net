import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";

const Dialogs = (props) => {
    let dialogsElements = props.dialogsData.map(dialogs =>
        <DialogItem name={dialogs.name} id={dialogs.id}/>);
    let messagesElements = props.messagesData.map(messages =>
        <MessageItem message={messages.message} id={messages.id}/>);

    let newMessageElement = React.createRef();

    let sendMessage = () => {
        props.sendMessage();
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageText(text);
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
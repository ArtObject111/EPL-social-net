import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.sendMessageBlock}>
                <Field component = {"textarea"} name = {"newMessageBody"} placeholder={"Enter your message"}/> <br/>
                <button>Send Message</button>
            </div>
        </form>
    )
}

const MessageReduxForm = reduxForm ({
    form: 'message'
}) (AddMessageForm)

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogsData.map(dialogs =>
        <DialogItem name={dialogs.name} id={dialogs.id}/>);
    let messagesElements = props.dialogsPage.messagesData.map(messages =>
        <MessageItem message={messages.message} id={messages.id}/>);

    // let newMessageElement = React.createRef();

    // let onSendMessage = () => {
    //     props.sendMessage();
    // }
    //
    // let onMessageChange = (e) => {
    //     let messageText = newMessageElement.current.value;
    //     props.updateNewMessageText(messageText);
    // }

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <MessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;
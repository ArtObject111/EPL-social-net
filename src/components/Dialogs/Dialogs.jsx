import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FromControls/FormControls";
import {maxLengthCreator} from "../../utils/validators/validators";

const maxLength25 = maxLengthCreator(25)

let AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.sendMessageBlock}>
                <Field component = {Textarea} name={"newMessageBody"} placeholder={"Enter your message"}
                       validate={[maxLength25]}/>
                <button>Send Message</button>
            </div>
        </form>
    )
}

AddMessageForm = reduxForm ({
    form: 'message'
}) (AddMessageForm)

const Dialogs = React.memo((props) => {

    let dialogsElements = props.dialogsPage.dialogsData.map(dialogs =>
        <DialogItem name={dialogs.name} id={dialogs.id}/>);
    let messagesElements = props.dialogsPage.messagesData.map(messages =>
        <MessageItem message={messages.message} id={messages.id}/>);

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
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
})

export default Dialogs;
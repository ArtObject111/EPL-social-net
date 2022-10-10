import React from "react";
import s from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialogItem + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const MessageItem = (props) => {
    return (
        <div className={s.messageItem}>
            {props.message}
        </div>
    )
}

let dialogsData = [
    {id: 1, name: "Bukayo Saka"},
    {id: 2, name: "Emile Smith Rowe"},
    {id: 3, name: "Gabriel Martinelli"},
    {id: 4, name: "Martin Ødegaard"},
    {id: 5, name: "Gabriel Jesus"}
]

let dialogsElements = [
    <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>,
    <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>,
    <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>,
    <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>,
    <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>
    ]


let messagesData = [
    {id: 1, message: "I play for Arsenal"},
    {id: 2, message: "What position do you play on?"},
    {id: 3, message: "What football team we meet on next weekends with?"}
]

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                {dialogsElements}

                {/*<DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>
                <DialogItem name={dialogsData[1].name} id={dialogsData[1].id}/>
                <DialogItem name={dialogsData[2].name} id={dialogsData[2].id}/>
                <DialogItem name={dialogsData[3].name} id={dialogsData[3].id}/>
                <DialogItem name={dialogsData[4].name} id={dialogsData[4].id}/>*/}
            </div>
            <div className={s.messagesItems}>
               {/* <MessageItem message={messagesData[0].message} id={messagesData[0].id}/>
                <MessageItem message={messagesData[1].message} id={messagesData[0].id}/>
                <MessageItem message={messagesData[2].message} id={messagesData[0].id}/>*/}
            </div>
        </div>
    )
}

export default Dialogs;
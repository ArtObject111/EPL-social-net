import React from "react";
import s from ".././Dialogs.module.css"
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialogItem + ' ' + s.active}>
            <img src="https://s5o.ru/storage/simple/ru/edt/aa/db/b0/29/rue97ff35b337.png"/>
            <NavLink className={s.person} to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;
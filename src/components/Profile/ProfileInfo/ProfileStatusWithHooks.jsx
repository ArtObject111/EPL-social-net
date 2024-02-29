import React, {useEffect, useState} from "react";
import s from "./ProfileInfo.module.css"

const ProfileStatusWithHooks = (props) => {

   /* let stateWithSetState = useState(false);
    let editMode = stateWithSetState[0];//в первом элементе массива хранится значение
    let setEditMode = stateWithSetState[1];//во втором элементе хранится функция, которая изменяет значение из 1ого эл-та*/
// пример деструктуризации
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if (!editMode && props.isOwner) {
            setEditMode(true)
        }
        else if (props.isOwner) {
            setEditMode(false)
            props.updateStatus(status)
        }
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            <span className={s.statusLabel}>Status: </span>
            {(!editMode) &&
                    <span onClick={activateEditMode}><br/>{props.status || "---"}</span>
            }
            {(editMode) &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={activateEditMode}
                           value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks
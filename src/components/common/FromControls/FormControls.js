import React from "react";
import s from "./FormControls.module.css"

export const FormControl = (Component) => ({input, meta, ...props}) => {

    const isError = meta.touched && meta.error

    return (
        <div className={`${s.formControl} ${isError ? s.error : ""}`}>
            <div>
                <Component  {...input} {...props}/>
            </div>
            <div>
                {isError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

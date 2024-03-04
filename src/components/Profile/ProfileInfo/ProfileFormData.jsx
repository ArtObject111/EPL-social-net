import React from "react"
import { createField, FormControl } from "../../common/FromControls/FormControls"
import { reduxForm } from "redux-form"
import s from "./ProfileInfo.module.css"

const Input = FormControl("input")
const Textarea = FormControl("textarea")

export let ProfileDataForm = ({ handleSubmit, profile, error }) => {

    return (
        <form onSubmit={handleSubmit}>
            <button>Save</button>
            {!!error&& <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>Full name: </div>{createField("Full name", "fullName", [], Input)}
            <div>About me: </div>{createField("About me", "aboutMe", [], Textarea)}
            <div>Looking for a job: </div>{createField(null, "lookingForAJob", null, "input", {type: "checkbox"}, "Yes")}
            <div>Professional skills: </div>{createField("Professional skills", "lookingForAJobDescription", [], Textarea)}
            <br />
            Contacts:
            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => <div key={key}><b>{key}: </b>{createField(key, `contacts.${key}`, null, Input)}</div>)}
            </div>
        </form>
    )
}

ProfileDataForm = reduxForm({
    form: "edit-profile"
})(ProfileDataForm)
import React from "react";
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../common/FromControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength10 = maxLengthCreator(10)
const Input = FormControl("input")

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name = {"login"} component = {Input}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name = {"password"} component = {Input}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <Field component = {"input"} name = {"rememberMe"} type={"checkbox"} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({
    form: 'login'
}) (LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div>
            <span>Login</span>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login;
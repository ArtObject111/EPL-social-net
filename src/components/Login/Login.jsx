import React from "react";
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../common/FromControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import s from "./Login.module.css"
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

const maxLength30 = maxLengthCreator(30)
const Input = FormControl("input")

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name = {"email"} component = {Input}
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name = {"password"} component = {Input}
                       type={"password"}  validate={[required, maxLength30]}/>
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
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (!!props.isAuth) {
        return (
            <Navigate to = {"/profile"}/>
        )
    }

    return (
        <div className={s.loginBlock}>
            <span>Login</span>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
        isAuth: state.authUserBro.data.isAuth
    })

export default connect(mapStateToProps, {login: loginTC} )(Login);
import React from "react";
import {reduxForm} from "redux-form";
import {createField, FormControl} from "../common/FromControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import s from "./Login.module.css"
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

const maxLength30 = maxLengthCreator(30)
const Input = FormControl("input")

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required, maxLength30], Input)}
            {/*<Field placeholder={"Email"} name = {"email"} component = {Input}*/}
            {/*       validate={[required, maxLength30]}/>*/}
            {createField("Password", "password", [required, maxLength30], Input, {type: "password"})}
            {/*<Field placeholder={"Password"} name = {"password"} component = {Input}*/}
            {/*       type={"password"}  validate={[required, maxLength30]}/>*/}
            {createField(null, "rememberMe", null, "input", {type: "checkbox"}, "remember me")}
            {/*<Field component = {"input"} name = {"rememberMe"} type={"checkbox"} /> remember me*/}
            {captchaUrl && <img src={captchaUrl} alt="captcha" />}
            {captchaUrl && createField("Enter symbols", "captcha", [required], Input)}
            {!!error&& <div className={s.formSummaryError}>
                {error}
            </div>}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (!!props.isAuth) {
        return (
            <Navigate to = {"/profile"}/>
        )
    }

    return (
        <div className={s.loginBlock}>
            <span>Login</span>
            <LoginReduxForm 
                onSubmit={onSubmit}
                captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
        isAuth: state.authUserBro.data.isAuth,
        captchaUrl: state.authUserBro.captchaUrl
    })

export default connect(mapStateToProps, {login: loginTC} )(Login);
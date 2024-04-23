import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Input, createField} from "../common/FromControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import s from "./Login.module.css"
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

const maxLength30 = maxLengthCreator(30)
// const Input = withFormControl("input")

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required, maxLength30], Input)}
            {/*<Field placeholder={"Email"} name = {"email"} component = {Input}*/}
            {/*       validate={[required, maxLength30]}/>*/}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required, maxLength30], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], "input", {type: "checkbox"}, "remember me")}
            {captchaUrl && <img src={captchaUrl} alt="captcha" />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Enter symbols", "captcha", [required], Input)}
            {!!error&& <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType> ({
    form: 'login'
}) (LoginForm)

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: undefined | null) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: undefined | null
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<PropsType> = (props) => {

    const onSubmit = (formData: any) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
        isAuth: state.authUserBro.data.isAuth,
        captchaUrl: state.authUserBro.captchaUrl
    })

export default connect(mapStateToProps, {login: loginTC} )(Login);
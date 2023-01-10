import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user_image.png";
import Preloader from "../common/Preloader/Preloader";

const Header = (props) => {
    const setAuthBlock = () => {
        if (props.isAuth) {
            return (
                <>
                    <img src={props.authUserPhoto ? props.authUserPhoto : userPhoto}/>
                    <span>{props.login}</span>
                </>)
        } else return <NavLink to={"/login"}>Login</NavLink>
    }
    return (
        <header className={s.header}>
            <img src="https://i.pinimg.com/originals/05/6d/ff/056dffd6660d2d8212b277ca9e10cc79.png"/>

            <div className={s.loginBlock}>
                {setAuthBlock()}
                {/*{props.isAuth ? props.login
                : <NavLink to={"/login"}>Login</NavLink>}
            <img src={props.authUserPhoto}/>//как всегда работает только тернарное выражение*/}
            </div>
        </header>
    )
}

export default Header;
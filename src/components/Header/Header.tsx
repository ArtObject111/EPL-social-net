import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user_image.png";

type PropsType = {
    isAuth: boolean,
    authUserPhoto: string | null,
    authUserName: string | null,

    logout: () => void
}

const Header: React.FC<PropsType> = ({
    isAuth,
    authUserPhoto,
    authUserName,

    logout
}) => {
    const setAuthBlock = () => {
        if (isAuth) {
            return (
                <>
                    <img src={authUserPhoto ? authUserPhoto : userPhoto}/>
                    <span>
                        {authUserName}
                        <div>
                            <button onClick={logout}>Log out</button>
                        </div>
                    </span>
                </>)
        }

        return <NavLink to={"/login"}>Login</NavLink>
    }
    return (
        <header className={s.header}>
            <img src="https://i.pinimg.com/originals/05/6d/ff/056dffd6660d2d8212b277ca9e10cc79.png"/>

            <div className={s.loginBlock}>
                {setAuthBlock()}
            </div>
        </header>
    )
}

export default Header;
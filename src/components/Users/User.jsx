import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user_image.png";
import s from "./Users.module.css";

export const User = ({
                         user,
                         followingInProgress,
                         unfollowBro,
                         followBro
                     }) => {
    return (
        <div key={user.id}>
            <div>
                <NavLink to={"/profile/" + user.id}>
                    <img alt={"User photo"} src={user.photos.small != null ? user.photos.small : userPhoto}
                         className={s.userPhoto}/>
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollowBro(user.id);
                              }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  followBro(user.id);
                              }}>Follow</button>}
            </div>
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>{"user.location.country"}</div>
            <div>{"user.location.city"}</div>
        </div>
    )
}
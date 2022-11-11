import React from "react";
import s from "./Users.module.css"
import axios from "axios";
import userPhoto from "../../assets/images/user_image.png"

let UsersFuncComp = (props) => {

    let getUsers = () => {
        if (props.usersData.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(responce => {
                    props.setUsers(responce.data.items)
                });
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.usersData.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.large != null ? u.photos.large : userPhoto} className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollowbro(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.followbro(u.id)
                                }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
            </div>)
        }
    </div>
}

export default UsersFuncComp;
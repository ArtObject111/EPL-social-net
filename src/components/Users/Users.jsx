import React from "react";
import s from "./Users.module.css"

let Users = (props) => {

    if (props.usersData.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
                followed: false,
                fullName: "Bukayo Saka",
                status: "I'm Arsenal player!",
                location: {city: "London", country: "England"}
            },
            {
                id: 2,
                photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
                followed: true,
                fullName: "Emile Smith Rowe",
                status: "I'm Arsenal player!",
                location: {city: "London", country: "England"}
            },
            {
                id: 3,
                photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
                followed: false,
                fullName: "Gabriel Martinelli",
                status: "I'm Arsenal player!",
                location: {city: "Guarulhos", country: "Brazil"}
            },
            {
                id: 4,
                photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
                followed: true,
                fullName: "Martin Ødegaard",
                status: "I'm Arsenal player!",
                location: {city: "Drammen", country: "Norway"}
            },
            {
                id: 5,
                photoUrl: "https://i2-prod.football.london/incoming/article25217096.ece/ALTERNATES/s1200c/0_GettyImages-1243789199.jpg",
                followed: true,
                fullName: "Gabriel Jesus",
                status: "I'm Arsenal player!",
                location: {city: "Sao Paulo", country: "Brazil"}
            },
        ])
    }

    return <div>
        {
            props.usersData.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {props.unfollowbro(u.id)}}>Unfollow</button>
                                : <button onClick={() => {props.followbro(u.id)}}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </span>
            </div>)
        }
    </div>
}

export default Users;
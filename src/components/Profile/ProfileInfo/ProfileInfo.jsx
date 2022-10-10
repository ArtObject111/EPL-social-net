import React from "react";
import s from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
    return (
        <div>
            <div>
                <img
                    src="https://w7.pngwing.com/pngs/892/488/png-transparent-green-grass-soccer-field-background-green-lawn-football-field.png"/>
            </div>
            <div className={s.descriptionBlock}>
                Avatar+description
            </div>
        </div>
    )
}

export default ProfileInfo;
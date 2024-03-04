import React, { useState } from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import bannerPhoto from "../../../assets/images/banner-picture.png"
import userPhoto from "../../../assets/images/user_image.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { ProfileDataForm } from "./ProfileFormData";

const ProfileInfo = ({
    isOwner,
    profile,
    status,
    updateStatus,
    updatePhoto,
    updateProfile
}) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => !editMode ? setEditMode(true) : setEditMode(false)


    if (!profile) {
        return <Preloader />
    }

    const setSymbol = () => {
        if (profile.lookingForAJob) {
            return (
                <div className={s.lookingForAJob}>
                    Открыт для вакансий<img src={"https://emojio.ru/images/apple-b/2705.png"} />
                </div>
            );
        } else if (!profile.lookingForAJob) {
            return (
                <div className={s.lookingForAJob}>
                    Работаю <img src={"https://emojis.wiki/emoji-pics/lg/tractor-lg.png"} />
                </div>
            );
        }
    }

    const ProfileData = ({ profile, isOwner, activateEditMode }) => {

        const Contact = ({ contactTitle, contactValue }) => {
            return <div><span>{contactTitle}: </span>{contactValue}</div>
        }

        return (
            <div className={s.profileData}>
                {isOwner && <button onClick={activateEditMode}>Edit</button>}
                <div className={s.fullName}>
                    {profile.fullName}
                </div>
                {profile.aboutMe && <div><span>About me: </span>{profile.aboutMe}</div>}
                {setSymbol()}
                {profile.lookingForAJobDescription &&
                    <div className={s.lookingForAJobDescription}><span>Professional skills: </span>{profile.lookingForAJobDescription}</div>}
                <div className={s.contacts}>
                    <div>Contacts:</div>
                    {Object.keys(profile.contacts).map(key => profile.contacts[key] && <Contact contactTitle={key} contactValue={profile.contacts[key]} />)}
                </div>
            </div>
        )
    }

    const updateUserPhoto = (e) => {
        e.target.files[0] && updatePhoto(e.target.files[0])
    }

    const onSubmit = (formData) => { //обернуть в async await не получится, т к он вернет промис
        console.log(formData)
        updateProfile(formData).then(
            () => activateEditMode()
        )
    }

    return (
        <div>
            <div className={s.banner}>
                <img alt={"Profile"} className={s.banner} src={bannerPhoto} />
                <div className={s.descriptionBlock}>
                    <div className={s.profilePhoto}>
                        <img alt={"User"} src={profile.photos.large || userPhoto} />
                        {isOwner && <input type="file" onChange={updateUserPhoto} />}
                    </div>
                    <div className={s.profileInfo}>
                        {editMode
                            ? <ProfileDataForm
                                initialValues={profile}
                                profile={profile}
                                activateEditMode={activateEditMode}
                                onSubmit={onSubmit} />
                            : <ProfileData
                                profile={profile}
                                isOwner={isOwner}
                                activateEditMode={activateEditMode} />}
                        <ProfileStatusWithHooks
                            isOwner={isOwner}
                            status={status}
                            updateStatus={updateStatus} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
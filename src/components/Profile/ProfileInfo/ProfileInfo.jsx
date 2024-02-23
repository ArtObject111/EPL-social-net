import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import bannerPhoto from "../../../assets/images/banner-picture.png"
import userPhoto from "../../../assets/images/user_image.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

/*{props.profile.lookingForAJob ? <img src={"https://emojio.ru/images/apple-b/2705.png"}/> // это тернарное выражение срабатывало в разметке, а полный условный оператор нет
    : <img src={"https://emoji-uc.akamaized.net/orig/ae/f30b7d0b156dfcbbb5e0d829e52791.png"}/>}*/

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }
    const setSymbol = () => {if (props.profile.lookingForAJob) {
        return (
            <div className={s.lookingForAJob}>
                Открыт для вакансий<img src={"https://emojio.ru/images/apple-b/2705.png"}/>
            </div>
        );
    }
    else if (!props.profile.lookingForAJob) {
        return (
            <div className={s.lookingForAJob}>
                Работаю <img src={"https://emojis.wiki/emoji-pics/lg/tractor-lg.png"}/>
            </div>
        );
    }}

    const updateUserPhoto = (e) => {
        e.target.files[0] && props.updatePhoto(e.target.files[0])
    }

    return (
        <div>
            <div className={s.banner}>
                <img alt={"Profile"} className={s.banner} src={bannerPhoto}/>
                <div className={s.descriptionBlock}>
                    <div className={s.profilePhoto}>
                        <img alt={"User"} src={props.profile.photos.large || userPhoto}/>
                        {props.isOwner && <input type="file" onChange={updateUserPhoto}/>}
                    </div>
                    <div className={s.profileInfo}>
                        <div className={s.fullName}>{props.profile.fullName}</div>
                        <div>{props.profile.aboutMe}</div>
                        <br/>
                        {setSymbol()}
                        <div className={s.lookingForAJobDescription}>{props.profile.lookingForAJobDescription}</div>
                        <div className={s.contacts}>Контакты:</div>
                        <div>{props.profile.contacts.facebook}</div>
                        <div>{props.profile.contacts.website}</div>
                        <div>{props.profile.contacts.vk}</div>
                        <div>{props.profile.contacts.twitter}</div>
                        <div>{props.profile.contacts.instagram}</div>
                        <div>{props.profile.contacts.youtube}</div>
                        <div>{props.profile.contacts.github}</div>
                        <div>{props.profile.contacts.mainLink}</div>
                        {props.isOwner ?
                            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/> :
                            <>
                                <span className={s.statusLabel}>Status: </span>
                                <div>{props.status || "---"}</div>
                            </>}
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPostsContainer store={props.store}
                              /*postsData = {props.profilePage.postsData}
                     newPostText = {props.profilePage.newPostText}
                     dispatch={props.dispatch}*/
                     /*addPost = {props.addPost}
                     updateNewPostText = {props.updateNewPostText}*/ />
        </div>
    )
}

export default Profile;
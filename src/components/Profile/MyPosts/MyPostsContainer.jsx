import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {

    let state = props.store.getState();

    let onAddPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (postText) => {
        let action = updateNewPostTextActionCreator(postText);// передаем содержимое postText в функции
        props.store.dispatch(action);                               // updateNewPostTextActionCreator, которая в state
    }

    return (<MyPosts postsData={state.profilePage.postsData}
                     newPostText={state.profilePage.newPostText}
                     addPost={onAddPost}
                     updateNewPostText={onPostChange}/>)
}

export default MyPostsContainer;
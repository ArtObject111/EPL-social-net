import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    let onAddPost = () => {
                        store.dispatch(addPostActionCreator());
                    }

                    let onPostChange = (postText) => {
                        let action = updateNewPostTextActionCreator(postText);// передаем содержимое postText в функции
                        store.dispatch(action);                               // updateNewPostTextActionCreator, которая в state
                    }
                    return <MyPosts postsData={state.profilePage.postsData}
                                    newPostText={state.profilePage.newPostText}
                                    addPost={onAddPost}
                                    updateNewPostText={onPostChange}/>
                }
            }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;
import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

/*const MyPostsContainer = (props) => {
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
}*/

let mapStateToProps = (state) => {
    return{
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        addPost: () => {
            dispatch(addPostActionCreator());
            },
        updateNewPostText: (postText) => {
            let action = updateNewPostTextActionCreator(postText);// передаем содержимое postText в функцию
            dispatch(action);                               // updateNewPostTextActionCreator, которая в state
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
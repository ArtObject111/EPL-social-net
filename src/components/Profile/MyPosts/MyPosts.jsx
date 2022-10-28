import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";

const MyPosts = (props) => {
    let postsElements =
        props.postsData.map( posts =>   <Post id = {posts.id} message = {posts.message} likecount = {posts.likesCount}/> );

    let newPostElement = React.createRef();


    let addPost = () => {
        //props.addPost();
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let postText = newPostElement.current.value;// присваиваем переменной postText, то что лежит в value
        //props.updateNewPostText(text);
        let action = updateNewPostTextActionCreator(postText);// передаем содержимое postText в функции
        props.dispatch(action);                               // updateNewPostTextActionCreator, которая в state
    }

    return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <div>
                    Write new post <br/>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText} /> <br/>
                    <button onClick={ addPost }>Add post</button>
                </div>
                <div>
                    {postsElements}
                </div>
            </div>
    )
}

export default MyPosts;
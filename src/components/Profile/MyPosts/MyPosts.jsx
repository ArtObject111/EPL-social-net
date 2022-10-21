import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

/*
let postsData = [
    {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
    {id: 2, message: "I support Aston Willa", likesCount: 7}
]
*/

const MyPosts = (props) => {
    let postsElements =
        props.postsData.map( posts =>   <Post id = {posts.id} message = {posts.message} likecount = {posts.likesCount}/> );

    let newPostElement = React.createRef();


    let addPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
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
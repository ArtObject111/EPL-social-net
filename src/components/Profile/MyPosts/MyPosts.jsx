import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsElements =
        props.postsData.map(posts => <Post id={posts.id} message={posts.message} likecount={posts.likesCount}/>);

    let newPostElement = React.createRef();


    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let postText = newPostElement.current.value;// присваиваем переменной postText, то что лежит в value
        props.updateNewPostText(postText);
    }

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <div>
                    Write new post <br/>
                    <textarea onChange={onPostChange} ref={newPostElement}
                              value={props.newPostText}/> <br/>
                    <button onClick={onAddPost}>Add post</button>
                </div>
                <div>
                    {postsElements}
                </div>
            </div>
        )
    }

export default MyPosts;
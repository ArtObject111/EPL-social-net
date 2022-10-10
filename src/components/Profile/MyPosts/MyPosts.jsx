import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

let postsData = [
    {id: 1, message: "Hello, what's your favourite EPL's club?", likesCount: 15},
    {id: 2, message: "I support Aston Willa", likesCount: 7}
]

const MyPosts = (props) => {
    return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <div>
                    Write new post <br/>
                    <textarea></textarea> <br/>
                    <button>Add post</button>
                </div>
                <div>
                    <Post id = {postsData[0].id} message = {postsData[0].message} likecount = {postsData[0].likesCount}/>
                    <Post id = {postsData[1].id} message = {postsData[1].message} likecount = {postsData[1].likesCount}/>
                    <Post/>
                    <Post/>
                </div>
            </div>
    )
}

export default MyPosts;
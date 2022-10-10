import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://s5o.ru/storage/simple/ru/edt/aa/db/b0/29/rue97ff35b337.png"/>
            {props.message} <br></br>
            <span>Likes</span> {props.likecount}
        </div>
    )
}

export default Post;
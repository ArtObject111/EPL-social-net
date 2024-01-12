import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

let AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={"textarea"} name={"newPostText"} placeholder={"New post will be here"}/> <br/>
            <button>Add post</button>
        </form>
    )
}

// const ReduxPostForm = reduxForm({
//     form: 'post'
// }) (AddPostForm)

AddPostForm = reduxForm({
        form: 'post'
})(AddPostForm)
const MyPosts = (props) => {
    let postsElements =
        props.postsData.map(posts => <Post key={posts.id} message={posts.message} likecount={posts.likesCount}/>)

    // let newPostElement = React.createRef();
    //
    //
    // let onAddPost = () => {
    //     props.addPost();
    // }
    //
    // let onPostChange = () => {
    //     let postText = newPostElement.current.value;// присваиваем переменной postText, то что лежит в value путем прямого воздействия на элемент
    //     props.updateNewPostText(postText);
    // }

    const addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                Write new post <br/>
                <AddPostForm onSubmit={addNewPost}/>
            </div>
                <div>
                    {postsElements}
                </div>
            </div>
        )
    }

export default MyPosts;
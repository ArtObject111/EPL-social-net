import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {FormControl} from "../../common/FromControls/FormControls";

const maxLength30 = maxLengthCreator(30)
const Textarea = FormControl("textarea")

let AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={"newPostText"} placeholder={"New post will be here"}
               validate={[required, maxLength30]} />
            <button>Add post</button>
        </form>
    )
}

AddPostForm = reduxForm({
        form: 'post'
})(AddPostForm)
const MyPosts = (props) => {
    let postsElements =
        props.postsData.map(posts => <Post key={posts.id} message={posts.message} likecount={posts.likesCount}/>)

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
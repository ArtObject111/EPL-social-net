import React, {PureComponent} from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FromControls/FormControls";

const maxLength30 = maxLengthCreator(30)

let AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={"newPostText"} placeholder={"New post will be here"}
               validate={[maxLength30]} />
            <button>Add post</button>
        </form>
    )
}

AddPostForm = reduxForm({
        form: 'post'
})(AddPostForm)

class MyPosts extends PureComponent{

    addNewPost = (values) => {
        this.props.addPost(values.newPostText);
    }

    render () {
        let postsElements =
            this.props.postsData.map(posts => <Post key={posts.id} message={posts.message} likecount={posts.likesCount}/>)

        return (
            <div className={s.postsBlock}>
                <h3>My posts</h3>
                <div>
                    Write new post <br/>
                    <AddPostForm onSubmit={this.addNewPost}/>
                </div>
                <div>
                    {postsElements}
                </div>
            </div>
        )
    }
}

export default MyPosts;
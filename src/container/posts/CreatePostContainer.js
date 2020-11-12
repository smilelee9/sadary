// Packages

import PostForm from '../../component/posts/PostForm';
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { createPost } from '../../state/posts';
import { setTitle } from "../../util";

// Components
function CreatePostContainer(props) {

    const { postCreated, createPost } = props
    const onSubmit = (post) => {
        createPost(post)
    }

    React.useEffect(() => setTitle('글 올리기'), [])


    return (
        <div>
            <PostForm {...props} onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state)=> {
    return {
        postCreated: state.posts.currentPost,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createPost }, dispatch);
}

// const validate = (values) => {
//     let errors = {};
//     fields.map((field) => {
//         if (!values[field]) {
//             errors[field] = `${field} is required`;
//         }
//     });
//     return errors;
// }

// const fields = ['title', 'description', 'content'];

// let createForm = reduxForm({
//     form: 'CreatePost',
//     fields,
//     validate
// })(CreatePostContainer);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostContainer);
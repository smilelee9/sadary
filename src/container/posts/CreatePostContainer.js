// Packages

import { createPost, resetCurrentPost } from '../../state/posts';
import { goToHome, setTitle } from "../../util";

import { Button } from '@material-ui/core';
import PostForm from '../../component/posts/PostForm';
import React from 'react'
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

// Components
function CreatePostContainer(props) {

    const { postCreated, createPost, history, resetCurrentPost } = props
    const onSubmit = (post) => {
        createPost(post)
    }

    React.useEffect(() => {
        if (postCreated.data && postCreated.data.id) {
            return () => {
                resetCurrentPost()
            }
        }
    }, [postCreated, history, resetCurrentPost])


    const createPost1 = () => {
        onSubmit({
            title: "제목 없음",
            desc: "설명설명",
            joinedUsers: [],
            maxNum: 6,
            id: "post10"
        })
    }

    React.useEffect(() => setTitle('글 올리기'), [])


    return (
        <div>
            <Button onClick={() => goToHome(history)}> 피드로 </Button>
            <Button onClick={createPost1}> 글 올리기 </Button>
            <PostForm postCreated={postCreated.data} onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        postCreated: state.posts.currentPost,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createPost, resetCurrentPost }, dispatch);
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
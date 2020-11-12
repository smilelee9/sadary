// Import packages

import PostForm from '../../component/posts/PostForm';
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { setTitle } from "../../util";
import { updatePost } from '../../state/posts';

// Import components
function EditPostContainer(props) {
    const { updatePost, post } = props
    const onSubmit = (post) =>
        updatePost(post, post.id);
    // TODO redirect to /${post.id}


    React.useEffect(() => {
        setTitle(`${post.title ? post.title : ''} 수정하기`)
    }, [])


    return (
        <div>
            <PostForm {...props} onSubmit={onSubmit} post={post.data} />
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: state.posts.currentPost,
        post: state.posts.currentPost,
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return bindActionCreators({ updatePost }, dispatch);

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

// let editorForm = reduxForm({
//     form: 'initializing',
//     fields,
//     validate
// })(EditPostContainer);

export default connect(mapStateToProps, mapDispatchToProps)(EditPostContainer);
// Import packages

import { deletePost, updatePost } from '../../state/posts';

import PostForm from '../../component/posts/PostForm';
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { setTitle } from "../../util";

// Import components
function EditPostContainer(props) {
    const { updatePost, post_id, deletePost, post } = props
    const onSubmit = (post) =>
        updatePost(post, post_id);

    const onDelete = () => {
        let s_confirm = confirm('Are you sure?') // eslint-disable-line 

        if (s_confirm) {
            deletePost(post_id);
        }
    }

    React.useEffect(() => {
        setTitle(`${post.title ? post.title : ''} 수정하기`)
    }, [])


    return (
        <div>
            <PostForm {...props} onSubmit={onSubmit} onDelete={onDelete} />
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: state.posts.currentPost,
        post: state.posts.currentPost,
        post_id: ownProps.params.id,
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return bindActionCreators({ updatePost, deletePost }, dispatch);

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
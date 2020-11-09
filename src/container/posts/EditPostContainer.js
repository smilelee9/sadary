// Import packages

// import {deletePost, getPostView, updatePost} from '../../actions/PostAction';

import PostForm from '../../component/posts/PostForm';
import React from 'react'

// Import components
export default function EditPostContainer() {
    return (
        <div>
            
        </div>
    )
}


// export class EditPostContainer extends Component {
//     onSubmit(post) {
//         this.props.updatePost(post, this.props.post_id);
//     }

//     onDelete() {
//         let s_confirm = confirm('Are you sure?')
//         if(s_confirm){
//             this.props.deletePost(this.props.post_id);
//         }
//     }

//     componentDidMount() {
//         this.props.getPostView(this.props.post_id);
//         this.props.resetAwait(['updatePost', 'deletePost']);
//     }

//     componentDidUpdate() {
//         if (this.props.awaitStatuses.deletePost == 'success') {
//             hashHistory.push('posts');
//         }
//         setTitle(`Edit post ${this.props.post.title ? this.props.post.title : ''}`)
//     }

//     render() {
//         return (
//             <div>
//                 <PostForm {...this.props} onSubmit={this.onSubmit.bind(this)} onDelete={this.onDelete.bind(this)}/>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state, ownProps)=> {
//     return {
//         initialValues: state.posts.currentPost,
//         post: state.posts.currentPost,
//         post_id: ownProps.params.id,
//         formType: 'edit',
//         keyAwait: "updatePost"
//     }
// }

// const mapDispatchToProps = (dispatch, state)=> {
//     return bindActionCreators({updatePost, getPostView, deletePost, resetAwait}, dispatch);

// }

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

// export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(editorForm);
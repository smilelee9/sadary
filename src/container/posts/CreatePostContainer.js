// Packages

// import {createPost} from '../../actions/PostAction';
// Components

import PostForm from '../../component/posts/PostForm';
import React from 'react'

export default function CreatePostContainer() {
    const handleSubmit = () => {

    }

    return (
        <div>
            <PostForm onSubmit={handleSubmit} />
        </div>
    )
}

// class CreatePostContainer extends Component {
//     onSubmit(post) {
//         this.props.createPost(post);
//     }

//     componentDidUpdate() {
//         const {awaitStatuses, keyAwait, postCreated} = this.props;
//         if (awaitStatuses[keyAwait] == 'success' && awaitStatuses.createPost) {
//             hashHistory.push(`/posts/edit/${postCreated.id}`);
//         }
//         setTitle(`Create post`);
//     }

//     componentDidMount() {
//         this.props.resetAwait([this.props.keyAwait]);
//     }

//     render() {
//         return (
//             <PostForm {...this.props} onSubmit={this.onSubmit.bind(this)}/>
//         )
//     }
// }

// const mapStateToProps = (state)=> {
//     return {
//         postCreated: state.posts.currentPost,
//         formType: 'create',
//         keyAwait: 'createPost'
//     }
// }

// const mapDispatchToProps = (dispatch)=> {
//     return bindActionCreators({createPost, resetAwait}, dispatch);
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

// let createForm = reduxForm({
//     form: 'CreatePost',
//     fields,
//     validate
// })(CreatePostContainer);

// export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(createForm);
import { deletePost, getPostView, resetCurrentPost } from '../../state/posts';

import PostView from '../../component/posts/PostView'
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { setTitle } from "../../util";

function PostViewContainer(props) {
    const postId = props.location.pathname.slice(1)
    const { getPostView } = props
    const onDelete = () => {
        if (props.post.data && props.post.data.id) {
            let s_confirm = confirm('정말 삭제하시겠어요?') // eslint-disable-line 
            if (s_confirm) {
                props.deletePost(props.post.data.id);
                props.resetCurrentPost();
            }
        }
    }

    console.log(props.post)
    React.useEffect(() => {
        props.post.data && setTitle(`${props.post.data.title}`)
    }, [props.post])

    React.useEffect(() =>
        getPostView(postId), [getPostView, postId])

    return (
        <div>
            {props.post.loading &&
                <div>
                    로딩중
                </div>}
            {props.post.error && <div> {props.post.error} </div>}
            {!props.post.loading && props.post.data && <PostView {...props} onDelete={onDelete} post={props.post.data} />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.authenticated.user,
        post: state.posts.currentPost
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return bindActionCreators({ getPostView, resetCurrentPost, deletePost }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(PostViewContainer)


// class PostViewContainer extends Component {
//     constructor() {
//         super(...arguments);
//         this.state = {
//             isAuthor: false
//         }
//     }

//     componentWillUnmount() {
//         this.props.resetCurrentPost();
//     }

//     componentWillReceiveProps(nextProps) {
//         if (this.props.post_id != nextProps.post_id) {
//             this.props.getPostView(nextProps.post_id);
//         }
//     }

//     componentDidUpdate() {
//         if (this.props.post.uid == this.props.uid && !this.state.isAuthor && this.props.post.uid) {
//             this.setState({isAuthor: true});
//         }
//         if (this.props.post.title) {
//             setTitle(this.props.post.title);
//         }
//     }

//     componentDidMount() {
//         this.props.getPostView(this.props.post_id);
//     }

//     render() {
//         return (
//             <PostView {...this.props} isAuthor={this.state.isAuthor}/>
//         )
//     }
// }

// const mapStateToProps = (state, ownProps)=> {
//     return {
//         uid: state.auth.authenticated.user.uid,
//         post: state.posts.currentPost,
//         post_id: ownProps.params.id
//     }
// }

// const mapDispatchToProps = (dispatch)=> {
//     return bindActionCreators({getPostView, resetCurrentPost}, dispatch);
// }

// export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(PostViewContainer);

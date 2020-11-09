// import {getPostsList, loadMorePosts} from '../../actions/PostAction';
// import {reduxAwait, setTitle} from '../../../utils/index';

import PostCreateButton from "../../component/posts/PostCreateButton";
import PostsList from "../../component/posts/PostsList";
import React from 'react'

// import {bindActionCreators} from 'redux';
// import {postsList as postsListConfig} from '../../../configs/index';


export default function PostsListContainer({ posts }) {
    console.log("PostListContainer" + " " + posts)
    return (
        <div>
            <PostsList posts={posts} />
            <PostCreateButton />
        </div>
    )
}

// class PostsListContainer extends Component{
//     componentDidMount(){
//         this.props.getPostsList();
//         setTitle('Posts List');
//     }

//     render(){
//         return (
//             <PostsList {...this.props}/>
//         )
//     }
// }

// const mapStateToProps = (state)=> {
//     return {
//         posts: state.posts.lists,
//         currentItems: state.posts.currentItems
//     }
// }

// const mapDispatchToProps = (dispatch)=> {
//     return bindActionCreators({getPostsList, loadMore: loadMorePosts}, dispatch)
// }

// export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);
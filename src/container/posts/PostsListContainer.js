import { getPostsList, loadMorePosts } from '../../state/posts';

import PostCreateButton from "../../component/posts/PostCreateButton";
import PostsList from "../../component/posts/PostsList";
import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { setTitle } from "../../util";

function PostsListContainer(props) {
    React.useEffect(() => {
        props.getPostsList();
        setTitle('피드')
    })

    return (
        <div>
            <PostsList posts={props.posts} />
            <PostCreateButton />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.lists,
        currentItems: state.posts.currentItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPostsList, loadMore: loadMorePosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);
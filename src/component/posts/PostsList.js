import PostView from './PostView'
import React from 'react';

export default function PostsList({ posts }) {

    var postList = posts && posts.length ? posts.map(post => <PostView post={post} />) : <p> 아직 게시글이 없어요! </p>
    // var postList = posts ? posts.map(post => <div> post </div>) : <p> 아직 게시글이 없어요! </p>

    return (
        <div>
            {postList}
        </div>
    );
};
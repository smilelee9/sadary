import PostView from './PostView'
import React from 'react';

export default function PostsList({ posts }) {
    console.log(posts)
    var postList = posts && posts.length ? posts.map(post => <PostView post={post} />) : <p> 아직 게시글이 없어요! </p>
    // var postList = posts ? posts.map(post => <div> post </div>) : <p> 아직 게시글이 없어요! </p>
    console.log(postList)
    var dummyPost = {
        title: "알고리즘 스터디 구해요",
        curNum: 1,
        maxNum: 4,
        desc: "주 3회 스터디 열심히 하실 분 구합니다",
    }

    return (
        <div>
            {postList}
            {/* <PostView post={dummyPost} /> */}
        </div>
    );
};
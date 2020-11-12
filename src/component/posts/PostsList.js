import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import PostItem from './PostItem'
import React from 'react';

export default function PostsList({ posts }) {
    var postList = posts && posts.length ? posts.map(post => <PostItem key={post.id} post={post} />) : <p> 아직 게시글이 없어요! </p>

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                {postList}
            </Container>
        </React.Fragment>

    );
};
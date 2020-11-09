import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import Button from '@material-ui/core/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';

export default function PostView({ post }) {
    return (
        <MuiThemeProvider>
            <Card>
                <CardHeader
                    title={post.title}
                    subtitle={" 현재 인원: " + post.curNum ? post.curNum : 0 + "/" + post.maxNum} actAsExpander={true} showExpandableButton={true} />
                <CardActions>
                    <Button disabled={false} onClick={() => console.log("참가")}> 
                        참가
                    </Button>
                    <Button onClick={() => alert("방 삭제")}>
                        삭제
                    </Button>
                </CardActions>
                <CardText expandable={true}>{post.desc}</CardText>
            </Card >
        </MuiThemeProvider>
    );
}
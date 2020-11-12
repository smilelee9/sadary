import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { NavLink } from 'react-router-dom'
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 20,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

});


// TODO 이미 참가했으면 참가 못하게
export default function PostItem({ post, onDelete }) {
    const classes = useStyles();

    return (
        <NavLink exact to={`/${post.id}`} style={{textDecoration: 'none'}}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {type[post.type]}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    현재 인원: {post.curMember ? post.curMember.length : 0}
                    / 최대 인원: {post.memberNum}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {post.desc}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">참가</Button>
                </CardActions>
            </Card>
        </NavLink >

    );
}

const type = {
    game: "게임",
    meal: "밥",
    meeting: "미팅",
    study: "스터디"
}
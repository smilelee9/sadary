import { Link, NavLink } from 'react-router-dom'

import { Box, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PeopleIcon from '@material-ui/icons/People';
import WcIcon from '@material-ui/icons/Wc';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'

    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },

    chipContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        alignSelf: 'center'
    },
    chip: {
        margin: theme.spacing(0.1),
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },


}));

const categoryChips = [
    { key: 'game', label: '게임' },
    { key: 'meeting', label: '미팅' },
    { key: 'study', label: '스터디' },
    { key: 'meal', label: '밥약' },
]

export default function PostForm(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        title: props.post ? props.post.title : '',
        memberNum: props.post ? props.post.memberNum : '',
        desc: props.post ? props.post.desc : '',
        location: props.post ? props.post.location : '',
        prefergender: props.post ? props.post.prefergender : null,
        type: props.post ? props.post.type : null
    })


    const onSelect = (type) => {
        setState({ ...state, type: type })
    }

    const chips =
        categoryChips.map((data) => {
            return (
                <ListItem key={data.key}>
                    <Chip
                        icon={data.icon}
                        label={data.label}
                        onClick={() => onSelect(data.key)}
                        clickable
                        className={classes.chip}
                    />
                </ListItem>
            );
        })


    const onSelectPreferredGender = () => {
        setState({ ...state, prefergender: "M" })
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <List className={classes.chipContainer}>
                            {chips}
                        </List>

                        <InputBase
                            required
                            id="title"
                            placeholder="제목을 간단하게 입력해주세요"
                            fullWidth
                            inputProps={{ 'aria-label': 'naked' }}
                            style={{ fontSize: 25 }}
                        />

                        <List classes={classes.list}>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <InputBase
                                    required
                                    id="location"
                                    placeholder="위치를 입력해 주세요"
                                    fullWidth
                                    inputProps={{ 'aria-label': 'naked' }}
                                />
                            </ListItem>
                            <Box m={2} />

                            <ListItem>
                                <ListItemIcon>
                                    <AccessTimeIcon />
                                </ListItemIcon>
                                <TextField
                                    id="datetime-local"
                                    label="만나고 싶은 시간을 정해주세요"
                                    type="datetime-local"
                                    defaultValue="2020-11-19T10:30"
                                    // className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </ListItem>
                            <Box m={2} />

                            <ListItem>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <TextField
                                    required
                                    id="memberNum"
                                    fullWidth
                                    placeholder="본인을 포함한 인원은 몇 명인가요?"
                                    name="numberformat"
                                />
                            </ListItem>
                            <Box m={2} />

                            <ListItem>
                                <ListItemIcon>
                                    <WcIcon />
                                </ListItemIcon>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">선호 성별이 있다면 골라주세요!</FormLabel>
                                    <RadioGroup row defaultValue="none" aria-label="gender" name="preffered gender">
                                        <FormControlLabel value="F" control={<Radio />} label="여성" />
                                        <FormControlLabel value="M" control={<Radio />} label="남성" />
                                        <FormControlLabel value="none" control={<Radio />} label="선호 없음" />
                                    </RadioGroup>
                                </FormControl>

                            </ListItem>
                            <Box m={2} />

                            <ListItem>
                                <ListItemIcon>
                                    <BorderColorIcon />
                                </ListItemIcon>
                                <TextField
                                    required
                                    id="others"
                                    fullWidth
                                    placeholder="기타사항이 있다면 적어주세요!"
                                />
                            </ListItem>
                            <Box m={2} />
                        </List>
                        <NavLink exact to={'/'} style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained" color="secondary"
                                fullWidth
                                onClick={() => { if (validate(state)) props.onSubmit(format(state)) }}>
                                글 업로드
                            </Button>
                        </NavLink>

                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment >
        // <React.Fragment>
        //     <CssBaseline />
        //     <Container maxWidth="sm">
        //         <div className={classes.root}>
        //             <div className={classes.margin}>



        //                 <Grid container spacing={1} alignItems="flex-end">
        //                     <Grid item>
        //                         <AccountCircle />
        //                     </Grid>
        //                     <Grid item>
        //                         <TextField id="others" placeholder="기타사항이 있다면 적어주세요" onChange={(e, text) => setState({ ...state, title: text })} />
        //                     </Grid>
        //                 </Grid>
        //             </div>



        //         </div>
        //     </Container>
        // </React.Fragment>
    );
}

function format({ title, maxNum, desc }) {
    return {
        title, maxNum: Number(maxNum), desc
    }
}

function validate(post) {
    // if (dep !== undefined && dest !== undefined && maxNum !== undefined) {
    //     desc ? createPost({dep, dest, maxNum, desc}) :
    //         createPost({
    //             dep, dest, maxNum, desc: '추가정보 없음'
    //         })
    //     return;
    // }
    // TODO Form에 입력된 항목 validate

    // window.alert('다시 입력하세요!');
    return true; // TODO validation
}
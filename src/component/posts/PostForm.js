import { Link, NavLink } from 'react-router-dom'
import { RaisedButton, TextField } from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';

export default function PostForm({onSubmit}) {
    const [state, setState] = React.useState({
        title: '',
        maxNum: '',
        desc: '',
    })

    return (
        <MuiThemeProvider>
            <TextField floatingLabelText="제목" onChange={(e, text) => setState({ ...state, title: text })} /><br />
            <NavLink exact to={'/'}>
                <RaisedButton label="방 개설" onClick={() => validate(state)} />
            </NavLink>
        </MuiThemeProvider>
    );
}

function createPost(post) {
    console.log("아직 구현 안됨")
}

function validate(post) {
    // if (dep !== undefined && dest !== undefined && maxNum !== undefined) {
    //     desc ? createPost({ dep, dest, maxNum, desc }) :
    //         createPost({
    //             dep, dest, maxNum, desc: '추가정보 없음'
    //         })
    //     return;
    // }
    // TODO Form에 입력된 항목 validate

    createPost(post)
    // window.alert('다시 입력하세요!');
}
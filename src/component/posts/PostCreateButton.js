import './button.css';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { NavLink } from 'react-router-dom'
import React from 'react';

export default function PostCreateButton() {
    return (
        <NavLink exact to={'create'} style={{ textDecoration: 'none' }}>
            <MuiThemeProvider>
                <FloatingActionButton style={style}>
                    <ContentAdd />
                </FloatingActionButton>
            </MuiThemeProvider>
        </NavLink>

    );
}

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 80,
    left: 'auto',
    position: 'fixed',
};
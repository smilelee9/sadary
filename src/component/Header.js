import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CSSBaseLine';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        top: '0',
        width: '100%',
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {},
        textDecoration: 'none',
        color: 'white'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            className={classes.title}
                            noWrap
                            component={NavLink} to='/'>
                            사다리
                        </Typography>

                        {
                            props.guest && (
                                <div style={{ margin: 10, justifyContent: 'space-between' }}>
                                    <Button variant="contained" color="white"> guest </Button>
                                    <NavLink exact to={'login'} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="white" >
                                            Log In
                                    </Button>
                                    </NavLink>
                                </div>
                            )
                        }

                        {
                            !props.guest && props.user && (
                                <div>
                                    {console.log(props.user)}
                                    안녕하세요, {props.user.email}님
                                    <Button variant="contained" color="white" >
                                        Log Out
                                </Button>
                                </div>

                            )
                        }

                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            onClick={handleMenu}
                            color="inherit"
                            component={NavLink} to='/'
                            edge='end'
                        >
                            <AccountCircle />
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </div>

        </React.Fragment>
    );
}
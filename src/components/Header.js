import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAuthToken, redirectTo, setAuthToken } from "../utils";
import { Button } from "@material-ui/core";

const menuItems = [
    {
        title: "Profile",
        icon: "user-circle",
        link: '/details',
    },
    {
        title: "Category",
        icon: "cubes",
        link: '/categories'
    },
    {
        title: "My Followers",
        icon: "users",
        link: '/'
    },
    // {
    //     title: "Profile",
    //     icon: <FontAwesomeIcon icon="bars"/>
    // }
];

export default function Header(props) {
    const Router = useHistory();
    const classes = props.classes;
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };


    const logOut = () => {
        setAuthToken('', -1);
        return redirectTo('/signIn');
    };

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <h1>Live Now</h1>
                    {getAuthToken() ? <Button color="inherit" onClick={logOut}>Log Out</Button> : <Link to={{pathname: '/signIn'}}> Sign In</Link>}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={
                    `${
                        clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })
                        } user-menu`
                }
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <Toolbar/>
                <div className={`${classes.toolbar} toggle-button`}>
                    <IconButton onClick={handleDrawerToggle}>
                        <FontAwesomeIcon icon={open ? 'angle-left' : 'angle-right'}/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon onClick={() => Router.push(item.link)}>
                                <FontAwesomeIcon className='menu-icons' icon={item.icon}/>
                            </ListItemIcon>
                            <ListItemText>
                                <p className='ffM'>{item.title}</p>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

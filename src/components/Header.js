import React from 'react';
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const menuItems = [
    {
        title: "Profile",
        icon: "user-circle"
    },
    {
        title: "Category",
        icon: "cubes"
    },
    {
        title: "My Followers",
        icon: "users"
    },
    // {
    //     title: "Profile",
    //     icon: <FontAwesomeIcon icon="bars"/>
    // }
];

export default function Header(props) {
    const classes = props.classes;
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <h1>Live Now</h1>
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
                            <ListItemIcon>
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
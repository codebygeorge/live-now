import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from "@material-ui/core/Toolbar";
import {Collapse, Button, IconButton} from '@material-ui/core';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20%',
        minWidth: 240,
        maxWidth: 360
    },
}));

export default function Panel() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    // const handleToggle = (value) => () => {
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];
    //
    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }
    //
    //     setChecked(newChecked);
    // };

    const [expanded1, setExpanded1] = React.useState(true);
    const [expanded2, setExpanded2] = React.useState(false);

    return (
        <div className={`${classes.root} panel-wrapper`}>
            <Toolbar/>

            <div className='top-bar' onClick={() => setExpanded1(!expanded1)}>
                <h4>Recommended</h4>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded1,
                    })}
                    aria-expanded={expanded1}
                    aria-label="show more"
                >
                    <FontAwesomeIcon icon={expanded1 ? 'caret-up' : 'caret-down'}/>
                </IconButton>
            </div>

            {/*<div className='top-bar'>*/}
                {/*<h4>Recommended</h4>*/}

                {/*<IconButton*/}
                    {/*className={clsx(classes.expand, {*/}
                        {/*[classes.expandOpen]: expanded1,*/}
                    {/*})}*/}
                    {/*onClick={() => setExpanded1(!expanded1)}*/}
                    {/*aria-expanded={expanded1}*/}
                    {/*aria-label="show more"*/}
                {/*>*/}
                    {/*<FontAwesomeIcon icon={expanded1 ? 'caret-up' : 'caret-down'}/>*/}
                {/*</IconButton>*/}
            {/*</div>*/}

            <Collapse in={expanded1} timeout="auto" unmountOnExit>
                <List dense className={classes.root}>
                    {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem key={value} button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${value + 1}`}
                                        src={`/static/images/avatar/${value + 1}.jpg`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`Line item ${value + 1}`}/>
                                {/*<ListItemSecondaryAction>*/}
                                {/*<Checkbox*/}
                                {/*edge="end"*/}
                                {/*onChange={handleToggle(value)}*/}
                                {/*checked={checked.indexOf(value) !== -1}*/}
                                {/*inputProps={{ 'aria-labelledby': labelId }}*/}
                                {/*/>*/}
                                {/*</ListItemSecondaryAction>*/}
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>

            <Toolbar/>


            <div className='top-bar' onClick={() => setExpanded2(!expanded2)}>
                <h4>Top 10</h4>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded2,
                    })}
                    aria-expanded={expanded2}
                    aria-label="show more"
                >
                    <FontAwesomeIcon icon={expanded2 ? 'caret-up' : 'caret-down'}/>
                </IconButton>
            </div>

            <Collapse in={expanded2} timeout="auto" unmountOnExit>
            <List dense className={classes.root}>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <ListItem key={value} button>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value + 1}`}
                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`}/>
                            {/*<ListItemSecondaryAction>*/}
                            {/*<Checkbox*/}
                            {/*edge="end"*/}
                            {/*onChange={handleToggle(value)}*/}
                            {/*checked={checked.indexOf(value) !== -1}*/}
                            {/*inputProps={{ 'aria-labelledby': labelId }}*/}
                            {/*/>*/}
                            {/*</ListItemSecondaryAction>*/}
                        </ListItem>
                    );
                })}
            </List>
            </Collapse>
        </div>
    );
}
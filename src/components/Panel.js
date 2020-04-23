import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
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
import API, { catchAxiosError } from "../utils/axiosEnv";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20%',
        minWidth: 240,
        maxWidth: 360
    },
}));

export default function Panel() {
    const classes = useStyles();
    const Router = useHistory();
    const [recommendedList, setRecommendedList] = React.useState([]);
    const [topTen, setTopTen] = React.useState([]);
    useEffect(() => {
        (async () => {
            const {response, error} = await API.get('/user/recommendedList').catch(catchAxiosError);
            if(error){
                console.log(error);
                // setErrorMessage(error);
            }
            if(response && response.success && response.data){
                if(response.data.top_ten_list && response.data.top_ten_list.length > 0){
                    setTopTen(response.data.top_ten_list);
                }
                if(response.data.recommended_list && response.data.recommended_list.length > 0){
                    setRecommendedList(response.data.recommended_list);
                }
            }
        })();
    }, []);
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
                    {recommendedList.map((item, index) => {
                        const labelId = `checkbox-list-secondary-label-${index}`;
                        return (
                            <ListItem key={index} button onClick={() => Router.push('/user/' + item.id)}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={item.profile_image}
                                        src={item.profile_image}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={item.username}/>
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
                {topTen.map((item, index) => {
                    const labelId = `checkbox-list-secondary-label-${index}`;
                    return (
                        <ListItem key={index} button onClick={() => Router.push('/user/' + item.id)}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={item.username}
                                    src={item.profile_image}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={item.username}/>
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
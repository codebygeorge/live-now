import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import UserContext from "../components/UserContext";
import { getAuthToken, redirectTo } from '../utils';
import API, { catchAxiosError } from '../utils/axiosEnv';

const useStyles = makeStyles((theme) => ({
    detailsCard: {
        maxWidth: 445,
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Details = (props) => {
    const classes = useStyles();
    const {userState, userDispatch} = useContext(UserContext);
    const [user, setUser] = useState({...props.user});
    useEffect(() => {
        if(!getAuthToken()) {
            redirectTo('/');
        }
        (async () => {
            const { response, error } = await API.get('/account/details').catch(catchAxiosError);
            if(response && response.success) {
                const userData = response.data;
                const stateData = {
                    firstname: userData.firstname,
                    lastname : userData.lastname,
                    username: userData.username,
                    email: userData.email,
                    photo: userData.profile_image,
                    about: userData.about
                };
                setUser(stateData);
                userDispatch(stateData);
            }
            if(error) console.log(error)
        })();
    }, []);


    return (
        <>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Card className={classes.detailsCard}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Profile image"
                                    height="200"
                                    title="Contemplative Reptile"
                                    src={user.profile_image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Username - {user.username}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                       Full Name -  {user.firstname + ' ' + user.lastname }
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {user.about}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Details;
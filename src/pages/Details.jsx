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
import Button from "@material-ui/core/Button";

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
    const { userState, userDispatch } = useContext(UserContext);
    const [profileImage, setProfileImage] = useState(null);
    useEffect(() => {
        if(!getAuthToken()) {
            redirectTo('/');
        }
    }, [userState]);


    const uploadImages = async () => {
        const fd = new FormData();
        fd.append('profile_image', profileImage);
        fd.append('background_image', null);
        const {response, error} = await API.post('/account/uploadimage', fd).catch(catchAxiosError);
        console.log(response);
        console.log(error);
    };

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
                                    src={userState.photo}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                       Full Name -  {userState.firstname + ' ' + userState.lastname }
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Email - {userState.email}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Username - {userState.username}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {userState.about}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                <input
                    type="file"
                    onChange={(e) => {
                        setProfileImage(e.target.files[0]);
                    }}
                />
                <Button size="medium" onClick={uploadImages}>upload</Button>
            </div>
        </>
    );
};

export default Details;
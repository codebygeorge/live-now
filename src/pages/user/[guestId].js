import React, {useEffect, useState} from 'react';
import API, {catchAxiosError} from "../../utils/axiosEnv";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from '@material-ui/core/CardActions';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
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

const GuestPage = (props) => {
    const classes = useStyles();
    const [userData, setUserData] = useState({});

    const followUnFollowUser = async (followUnFollow) => {
        console.log(props.match.params.id, followUnFollow);
        const {response, error} = await API.put('/user/follow', {id: props.match.params.id, following: followUnFollow}).catch(catchAxiosError);
        if(error) {
            console.log(error, 'mtav err');
        }
        if(response && response.success) {
            setUserData({...userData, followed: followUnFollow})
        }
    };

    useEffect(() => {
        (async () => {
           const {response, error} = await API.get('/user/get', {params: {id: props.match.params.id}}).catch(catchAxiosError);
           if(error) {
               console.log(error, 'mtav err');
           }
           if(response && response.success && response.data) {
               setUserData({...response.data})
           }
        })();

    }, [props.match.params.id]);
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
                                    src={userData.photo}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Full Name -  {userData.fullname}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Username - {userData.username}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {userData.about}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to follow list">
                                        {!userData.followed ?
                                            <Button size="small" onClick={() => followUnFollowUser(true)}>
                                                Follow
                                            </Button>
                                            :
                                            <Button size="small" onClick={() => followUnFollowUser(false)}>
                                                UnFollow
                                            </Button>
                                        }
                                    </IconButton>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
export default GuestPage
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API, {catchAxiosError} from '../../utils/axiosEnv';
import {getAuthToken, redirectTo, setAuthToken} from '../../utils';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '400px',
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInWrapper() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(getAuthToken()) redirectTo('/details');
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const {response, error} = await API.post('/auth/signin', {
            email,
            password
        }).catch(catchAxiosError);
        if(error) setErrorMessage(error);
        if(response && response.success && response.data.id){
           setAuthToken(response.data.token, '1d');
           return redirectTo('/details');
        }
    };

    const removeErrorMessageBtn =  (
        <Button size="small" style={{color: 'white'}} onClick={() => setErrorMessage('')}>
            X
        </Button>
    );

    return (
        <Container component="main" maxWidth="xs" style={{paddingTop: '50px', marginTop: '50px'}}>
            <CssBaseline />
            <Card className={classes.root} style={{padding: '20px'}}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {errorMessage && <SnackbarContent role="alert" style={{width: '100%', margin: '10px'}} message={errorMessage} action={removeErrorMessageBtn} />}
                    <form className={classes.form} noValidate onSubmit={submit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={({target: {value}}) => setEmail(value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={({target: {value}}) => setPassword(value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                {/*<CardActions disableSpacing>*/}
                {/*    <IconButton aria-label="add to favorites">*/}
                {/*        <FontAwesomeIcon icon="facebook-square"/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton aria-label="share">*/}
                {/*        <FontAwesomeIcon icon="instagram-square"/>*/}
                {/*    </IconButton>*/}
                {/*    <IconButton aria-label="share">*/}
                {/*        <FontAwesomeIcon icon="linkedin"/>*/}
                {/*    </IconButton>*/}
                {/*</CardActions>*/}
            </Card>
        </Container>
    );
}

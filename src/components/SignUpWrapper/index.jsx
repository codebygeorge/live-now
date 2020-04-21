import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API, {catchAxiosError} from "../../utils/axiosEnv";
import {getAuthToken, redirectTo, setAuthToken} from "../../utils";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpWrapper() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [username, setUserName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const [validationErrors, setValidationErrors] = useState({firstname: '', lastname: '', password: '', email: '', username: ''});
    const [errorMessages, setErrorMessages] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const errors = Object.values(validationErrors);
        for(let i = 0; i < errors.length; i++){
            if(errors[i]) {
                setDisabled(true);
                return;
            }
        }
        setDisabled(false);
    }, [validationErrors]);

    useEffect(() => {
        if(getAuthToken()) redirectTo('/details');
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const {response, error} = await API.post('/auth/signup', {
            firstname: firstname, lastname: lastname ,email, password, username,
        }).catch(catchAxiosError);
        if(typeof error === 'object') {
            const backEndErrorMessages = {};
            const entries = Object.entries(error);
            for(const [key, value] of entries){
               backEndErrorMessages[key] = value;
            }
            setValidationErrors(backEndErrorMessages);
        }
        if(response && response.success && response.data.id){
            setAuthToken(response.data.token, '1d');
            return window.location.href = "/profile";
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!!(validationErrors.firstname)}
                                helperText={validationErrors.firstname}
                                autoComplete="fname"
                                name="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                autoFocus
                                onChange={({target: {value}}) => {
                                    if(!value) {
                                        setValidationErrors({...validationErrors, firstname: 'Not valid First Name'});
                                    }else{
                                        setValidationErrors({...validationErrors, firstname: ''});
                                    }
                                    setFirstName(value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!!validationErrors.lastname}
                                helperText={validationErrors.lastname}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                autoComplete="lname"
                                onChange={({target: {value}}) => {
                                    if(!value) {
                                        setValidationErrors({...validationErrors, lastname: 'Not valid Last Name'});
                                    }else{
                                        setValidationErrors({...validationErrors, lastname: ''});
                                    }
                                    setLastName(value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                error={!!validationErrors.username}
                                helperText={validationErrors.username}
                                onChange={({target: {value}}) => {
                                    if(!value) {
                                        setValidationErrors({...validationErrors, username: 'Not valid Email'});
                                    }else {
                                        setValidationErrors({...validationErrors, username: ''});
                                    }
                                    setUserName(value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={!!validationErrors.email}
                                helperText={validationErrors.email}
                                onChange={({target: {value}}) => {
                                    if(!value) {
                                        setValidationErrors({...validationErrors, email: 'Not valid Email'});
                                    }else {
                                        setValidationErrors({...validationErrors, email: ''});
                                    }
                                    setEmail(value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!!validationErrors.password}
                                helperText={validationErrors.password}
                                onChange={({target: {value}}) => {
                                    if(!value){
                                        setValidationErrors({...validationErrors, password: 'Not valid Password'});
                                    }else {
                                        setValidationErrors({...validationErrors, password: ''});
                                    }
                                    setPassword(value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={disabled}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signIn" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
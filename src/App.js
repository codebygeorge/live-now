import React, {useEffect, useReducer} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Panel from "./components/Panel";

// import NotFound from "./views/NotFound";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import StreamPage from "./pages/StreamPage";
import UserContext, { initialState, UserReducer } from "./components/UserContext";
import {getAuthToken, redirectTo, setAuthToken} from "./utils";

import './scss/style.scss';
import './scss/bootstrap/bootstrap.min.css';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const drawerWidth = 200;
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#af2ac3',
            main: '#9223af',
            dark: '#741f9b',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
    },
}));


export default function App() {
    const classes = useStyles();
    const [userState, userDispatch] = useReducer(UserReducer, initialState);
    const UserProviderValue = { userState, userDispatch };
    return (
        <ThemeProvider theme={theme}>
            <div className={`${classes.root} App`}>
                <UserContext.Provider value={UserProviderValue}>
                    <Header classes={classes}/>
                    <div className={classes.content}>
                        <main className='main'>
                            <Switch>
                                <Route exact path="/" component={SignIn}/>
                                <Route exact path="/landing" component={Landing}/>

                                    <Route exact path="/details" component={Details}/>
                                    <Route exact path="/categories" component={Profile}/>
                                <Route exact path="/signUp" component={SignUp}/>
                                <Route exact path="/streamPage" component={StreamPage}/>
                                <Redirect to="/"/>
                            </Switch>
                        </main>
                        <Footer/>
                    </div>
                    <Panel/>
                </UserContext.Provider>
            </div>
        </ThemeProvider>
    );
}


//
//
//
//
//
// import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
// import {Switch, Redirect, Route} from 'react-router-dom';
//
// import './scss/style.scss';
//
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// // import NotFound from "./views/NotFound";
// import Landing from "./pages/Landing";
//
// class App extends Component {
//
//     render() {
//         return (
//             <div className="App">
//                 <Header/>
//
//
//
//                 <Footer/>
//             </div>
//         );
//     }
// }
//
// export default withRouter(props => <App {...props}/>);

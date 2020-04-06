import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {ThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Panel from "./components/Panel";

// import NotFound from "./views/NotFound";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";

import './scss/style.scss';

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

    return (
        <ThemeProvider theme={theme}>
        <div className={`${classes.root} App`}>

            <Header classes={classes}/>

            <div className={classes.content}>
                <Toolbar/>

                <main className='main'>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Redirect to="/"/>
                    </Switch>
                </main>

                <Footer/>
            </div>

            <Panel/>
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

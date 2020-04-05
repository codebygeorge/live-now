import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router-dom';

import './scss/style.scss';

import Header from "./components/Header";
import Footer from "./components/Footer";
// import NotFound from "./views/NotFound";v
import Landing from "./pages/Landing";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>

                <main className='main'>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Redirect to="/"/>
                    </Switch>
                </main>

                <Footer/>

            </div>
        );
    }
}

export default withRouter(props => <App {...props}/>);

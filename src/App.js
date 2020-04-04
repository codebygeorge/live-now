import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router-dom';

import './scss/style.scss';

import Header from "./components/Header";
import Landing from "./pages/Landing";
// import DemoScene from './components/Structural';
import Item from './components/Item';
// import Footer from "./components/Footer";
// import NotFound from "./views/NotFound";v

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>

                <main className='main'>
                    <Switch>
                        {/*User*/}
                        {/*<Route exact path="/" component={Landing}/>*/}
                        <Route exact path="/item" component={Item}/>
                        {/*<Route exact path="/structural" component={DemoScene}/>*/}
                        {/*<Route exact path="/notfound" component={NotFound}/>*/}

                        {/*<Redirect to="/"/>*/}
                        <Redirect to="/item" component={Item}/>
                    </Switch>
                </main>

                {/*<Footer/>*/}

            </div>
        );
    }
}

export default withRouter(props => <App {...props}/>);

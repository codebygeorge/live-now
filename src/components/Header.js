import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {AppBar, Toolbar, IconButton, Button} from '@material-ui/core';

class Header extends Component {

    render() {
        return (
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <h1>Jewelry Demo</h1>


                        {/*<Button color="inherit">*/}
                        {/*<NavLink exact className="pageLink" activeClassName="active" to="/">*/}
                        {/*All List*/}
                        {/*</NavLink>*/}
                        {/*</Button>*/}


                        {/*<Button color="inherit">*/}
                        {/*<NavLink exact className="pageLink" activeClassName="active" to="/final">*/}
                        {/*Final*/}
                        {/*</NavLink>*/}
                        {/*</Button>*/}
                        {/*<Button color="inherit">*/}
                        {/*<NavLink exact className="pageLink" activeClassName="active" to="/structural">*/}
                        {/*Structural*/}
                        {/*</NavLink>*/}
                        {/*</Button>*/}
                    </Toolbar>
                </AppBar>
                <p className="copyright">Design and build by <b>George Ghazaryan</b> and <b>Hayk Aleksanyan</b></p>
            </header>
        )
    }
}

export default Header;
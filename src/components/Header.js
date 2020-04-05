import React, {Component} from 'react';
import {AppBar, Toolbar} from '@material-ui/core';

class Header extends Component {

    render() {
        return (
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <h1>Live Now</h1>
                    </Toolbar>
                </AppBar>
            </header>
        )
    }
}

export default Header;
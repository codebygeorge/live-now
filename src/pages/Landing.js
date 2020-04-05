import React, {Component} from 'react';
import UserMenu from "./../components/UserMenu"
import {isDesktop} from "../Constants";

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemData: [],
            loaded: false
        };
    }

    render() {
        const {itemData, loaded} = this.state;

        return (
            <div className='page home'>
                <UserMenu/>
            </div>
        );
    }
}

export default Landing;


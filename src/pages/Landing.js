import React, {Component} from 'react';

import CardList from "../components/CardList";
import {AccessAlarm} from "@material-ui/icons";
import {myAxios} from "./../Constants"

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemData: [],
            loaded: false
        };
    }

    componentWillMount() {
        myAxios.get(`items.json`)
            .then(response => {
                this.setState({
                    itemData: response.data,
                    error: null,
                    loaded: true
                });
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response);
                this.setState({
                    error: true,
                    loaded: true
                })
            });
    }


    render() {
        const {itemData, loaded} = this.state;

        return (
            <div className='page home'>
                <h1>Demo for online jewelry shop. <AccessAlarm/></h1>
                <CardList
                    data={itemData}
                    loaded={loaded}
                />
            </div>
        );
    }
}

export default Landing;


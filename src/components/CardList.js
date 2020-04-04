import React, {Component} from 'react';
import {
    Box,
    Grid,
} from '@material-ui/core';
import SingleCard from "./SingleCard";


class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {data, loaded} = this.props;

        return (
            <Box overflow="hidden">
                <Grid container justify="center">

                    {loaded &&
                    data.map((item, index) => (
                        <SingleCard key={index} data={item}/>
                    ))
                    }
                </Grid>
            </Box>
        );
    }
}

export default CardList;


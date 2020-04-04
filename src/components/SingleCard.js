import React from 'react';
import {Link} from 'react-router-dom';
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 345,
        minHeight: 275,
        maxWidth: 345
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'red[500]',
    },
}));


export default function SingleCard(props) {
    const classes = useStyles();
    const data = props.data;

    return (
        <Box px={2}>
            <Card className={classes.card}>
                <Link to={`/item/${data.id}`}>
                    <CardMedia
                        className={classes.media}
                        image={data.image}
                        title={data.title}
                    >
                    </CardMedia>
                </Link>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {data.description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

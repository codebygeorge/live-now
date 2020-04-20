import React, {Component} from 'react';
import axios from "axios";
import {myAxios, nFormatter} from '../utils/constants';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton,} from '@material-ui/core';
import UserProfilePicture from './../components/User/ProfilePicture';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: undefined,
            loaded: false,
            loadError: false
        };
    };

    componentWillMount() {
        this.getData();
    }

    getData() {
        window.scrollTo(0, 0);

        if (typeof this.getCall !== typeof undefined) {
            this.getCall.cancel('Operation canceled due to new request.')
        }

        this.getCall = axios.CancelToken.source();

        // myAxios.get(`/pages/${this.props.match.params.slug}`, {cancelToken: this.getCall.token})
        myAxios.get(`/data/categories.json`, {cancelToken: this.getCall.token})
            .then(response => {
                this.setState({
                    data: response.data,
                    isLoaded: true,
                    loadError: false
                });
                console.log(response.data);
            })
            .catch(error => {
                if (!axios.isCancel(error)) {
                    console.log(error);

                    this.setState({
                        loadError: true
                    })
                }
            })
            .finally(() => {
                this.setState({});
            })
    }

    drawCategoryList = (userIds) => {

        let filteredUserList = this.state.data.users.filter(user => userIds.includes(user.id));

        const {data} = this.state;

        return (
            <ul className='user-list'>
                {
                    filteredUserList.length > 0 && filteredUserList.map((user, userID) => (
                        <Card className='user' key={userID}>
                            {user.background_picture && (
                                <div className='user-back-image' style={{backgroundImage: `url(${user.background_picture})`}}/>
                            )}
                            <CardHeader
                                className='card-header'
                                avatar={<UserProfilePicture image={user.profile_picture}/>}
                                action={
                                    <IconButton aria-label="settings" size='medium' className='sub-menu'>
                                        <FontAwesomeIcon icon={['fab', 'buffer']}/>
                                    </IconButton>
                                }
                                title={<p className='user-name'>{user.name}</p>}
                                subheader={<p className='followers-count'>{`Followers ${nFormatter(user.followers)}`}</p>}
                            />
                            <CardContent className='user-description'>
                                <p>{user.status_text.length < 100 ? user.status_text : `${user.status_text.substring(0, 100)}...`}</p>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton className={`follow ${data.followers.includes(user.id) ? 'following' : ''}`}
                                            aria-label="add to favorites"
                                            onClick={() => this.toggleFollow(user.id)}
                                >
                                    <FontAwesomeIcon className='fontAwesome-icon'
                                                     icon={[`${data.followers.includes(user.id) ? 'fas' : 'far'}`, 'heart']}/>
                                </IconButton>
                                <IconButton aria-label="share">
                                <FontAwesomeIcon className='fontAwesome-icon' icon={['far', 'dot-circle']}/>
                                </IconButton>
                                <p className='last-stream'>{`Last stream on ${user.last_stream}`}</p>
                            </CardActions>
                        </Card>
                    ))}
            </ul>
        )
    };

    toggleFollow = (userId) => {
        const {data} = this.state;

        // let followers = new Set();
        // followers.add(userId);

        if (data.followers.includes(userId)) {
            this.setState({
                data: {
                    ...data,
                    followers: [...data.followers.filter(f => f !== userId)]
                }
            })
        } else {
            this.setState({
                data: {
                    ...data,
                    followers: [...data.followers, userId]
                }
            })
        }
    };

    render() {
        const {isLoaded, loadError, data} = this.state;

        return (
            <div className='page dashboard'>

                {isLoaded ? (
                    loadError ? (
                        <p>Error!</p>
                    ) : (
                        <div className='categories'>
                            {data.categories.length > 0 && data.categories.map((item, categoryID) => (
                                <div className='category-wrapper' key={categoryID}>
                                    <div className='category-title'>
                                        <FontAwesomeIcon icon='gamepad'/>
                                        <h4>{item.title}</h4>
                                    </div>
                                    {this.drawCategoryList(item.userIds)}
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <p>Loading...</p>
                )}

            </div>
        );
    }
}

export default Profile;


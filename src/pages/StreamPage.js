import React, { Component } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import OpenViduSession from 'openvidu-react';
import { BASE_API, MY_SECRET } from '../utils';

class StramPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
            token: undefined,
        };

        this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
        this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
        this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.joinSession = this.joinSession.bind(this);
    }

    handlerJoinSessionEvent() {
        console.log('Join session');
    }

    handlerLeaveSessionEvent() {
        console.log('Leave session');
        this.setState({
            session: undefined,
        });
    }

    handlerErrorEvent() {
        console.log('Leave session');
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    joinSession(event) {
        if (this.state.mySessionId && this.state.myUserName) {
            this.getToken().then((token) => {
                this.setState({
                    token: token,
                    session: true,
                });
            });
            event.preventDefault();
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const token = this.state.token;
        return (
            <div>
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="join-dialog">
                            <h1> Join a video session </h1>
                            <Form onSubmit={this.joinSession}>
                                <Form.Group controlId="formParticipant">
                                    <Form.Label>Participant:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formSessionId">
                                    <Form.Label>Session Id</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </Form.Group>
                                <Button name="commit" type="submit" value="JOIN">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                ) : (
                    <div id="session" style={{}}>
                        <OpenViduSession
                            id="opv-session"
                            sessionName={mySessionId}
                            user={myUserName}
                            token={token}
                            openviduServerUrl="livenowmedia.pw"
                            joinSession={this.handlerJoinSessionEvent}
                            leaveSession={this.handlerLeaveSessionEvent}
                            error={this.handlerErrorEvent}
                        />
                    </div>
                )}
            </div>
        );
    }

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
     *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
     *   3) The token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId)
        // .then((sessionId) => this.createToken(sessionId))
        // .catch((Err) => console.error(Err));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            let data = JSON.stringify({ sessionName: sessionId });
            axios
                .get(BASE_API + '/stream/getToken', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + MY_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data[0]);
                    this.setState({
                        token: response.data[0],
                        session: true,
                    });
                })
                .catch((response) => {
                    let error = Object.assign({}, response);
                    if (error.response && error.response.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' + BASE_API,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                BASE_API +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                BASE_API +
                                '"',
                            )
                        ) {
                            window.location.assign(BASE_API + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            let data = JSON.stringify({ session: sessionId });
            axios
                .post(BASE_API + '/api/tokens', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + MY_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default StramPage;

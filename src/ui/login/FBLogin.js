'use strict';
const React = require('react');
const logger = require('./../logger');
const requestHelper = require('../requests/requestHelper');
const config = require('../config/config');
const loginUtils = require('./utils');

class FacebookButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
    }

    componentDidMount() {
        const self = this;
        window.fbAsyncInit = function () {
            FB.init({
                cookie: true,
                appId: '613955262141986',
                xfbml: true,
                version: 'v2.8'
            });

            FB.Event.subscribe('auth.statusChange', (resp) => {
                self.statusChangeCallback(resp);
            });

            logger.info('Loaded facebook api');
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/pl_PL/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    statusChangeCallback(response) {
        logger.info('statusFBChangeCallback');
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        const self = this;
        if (response.status === 'connected') {
            //send response.accessToken to server.
            //on callback perform login

            logger.info('Connected to facebook');
            const successCb = (data) => {
                loginUtils.saveTokenAndEmail(data.token, data.email);
                window.location.href = '/';
            };

            const failCb = () => {
                this.setState({errorMsg: 'Nie udało się zalogować'})
            };

            if (!loginUtils.isLoggedIn()) {

                requestHelper.postFormRequest(config.fbLoginUrl, {
                    token: response.authResponse.accessToken
                }, successCb, failCb);

                FB.api('/me', function (response) {
                    const message = 'Welcome ' + response.name;
                    self.setState({
                        message: message
                    });
                });
            }
            // Logged into your app and Facebook.
        } else if (response.status === 'not_authorized') {
            logger.info('app unauthorized');
            // The person is logged into Facebook, but not your app.
            this.setState({message: 'Nie udane logowanie.'});
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            logger.info('Not logged');
            this.setState({message: 'Zaloguj się.'});
        }
    }

    checkLoginState() {
        const self = this;
        FB.getLoginStatus(function (response) {
            self.statusChangeCallback(response);
        });
    }

    handleLogin() {
        FB.login(this.checkLoginState(), {scope: 'email'});
    }


    render() {

        let failMsg = null;

        if (this.state.errorMsg) {
            failMsg = <div className='alert alert-danger'>
                {this.state.errorMsg}
            </div>;
        }

        return (
            <div>
                {failMsg}
                <button className='loginBtn loginBtn-facebook' onClick={this.handleLogin}>
                    Logowanie z FB
                </button>
            </div>
        );
    }
}
;

module.exports = FacebookButton;

'use strict';

const React = require('react');
const logger = require('./../logger');
const config = require('../config/config');
const loginUtils = require('./utils');
const Link = require('react-router').Link;
const axios = require('axios');

class LogginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.fetchToken = this.fetchToken.bind(this);
        this.loginOnEnterKey = this.loginOnEnterKey.bind(this);
    }

    fetchToken(email, pass, cb) {

        axios.post(config.loginUrl, {username: email, password: pass})
            .then( ({data}) => {
                cb(data.token);
                self.setState({})
            })
            .catch( ({response:{data, status}}) => {
                logger.info(`Fails status:  ${status}, data: ${data}`);
                self.setState({errorMsg: 'Błędne hasło lub nazwa użytkownika'})
            });
    }

    handleLogin(e) {

        if (e.preventDefault) {
            e.preventDefault();
        }

        const email = this.state.email;
        this.fetchToken(email, this.state.password, function (token) {
            loginUtils.saveTokenAndEmail(token, email);
            window.location.href = '/';
        })
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }


    loginOnEnterKey(e) {

        if (e.key !== 'Enter') {
            return;
        }

        if (!this.state.email || this.state.email.length < 2) {
            return;
        }

        if (!this.state.password || this.state.password.length < 2) {
            return;
        }

        this.handleLogin({})
    }

    render() {

        let failMsg = null;

        if (this.state.errorMsg) {
            failMsg = <div className='alert alert-danger'>
                {this.state.errorMsg}
            </div>;
        }

        return <div className='col-md-12'>
            <form className='form' role='form' id='login-nav'>
                {failMsg}
                <div className='form-group'>
                    <label className='sr-only' htmlFor='email'>Email</label>
                    <input type='email' onChange={this.handleEmailChange} onKeyUp={this.loginOnEnterKey} className='form-control'
                           id='email'
                           placeholder='Email address' required/>
                </div>
                <div className='form-group'>
                    <label className='sr-only' htmlFor='password'>Hasło</label>
                    <input type='password' onChange={this.handlePasswordChange} onKeyUp={this.loginOnEnterKey}
                           className='form-control'
                           id='password'
                           placeholder='Password' required/>
                    <div className='help-block text-right'><Link to='/resetPassword' activeClassName='active'>Zapomniałeś
                        hasła?</Link></div>
                </div>
                <div className='form-group'>
                    <input type='button' onClick={this.handleLogin} value='Zaloguj' className='btn btn-primary btn-block'/>
                </div>
            </form>
        </div>

    }

}


module.exports = LogginForm;

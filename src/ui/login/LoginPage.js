'use strict';

const React = require('react');
const Link = require('react-router/lib/Link');
const LoginForm = require('./LoginForm');
const loginUtil = require('../login/utils');
const routingUtils = require('../../utils/routing');

const FBLogin = require('./FBLogin');

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        if (loginUtil.isLoggedIn()) {
            routingUtils.toMainWithSuccess(this);
            return;
        }

        let msg = null;

        if (this.state.msg) {
            msg = <div className='alert alert-danger'>
                {this.state.msg}
            </div>;
        }

        return <div className='Row'>

            <div className='col-md-6 col-md-offset-3 col-xs-12'>
                {msg}
                <p>Zaloguj się lub <Link to='accounts/add'><b>Załóż konto</b></Link></p>
                <hr/>
                <div className='row'>
                    <div className='col-md-6 col-xs-12 vertical-right'>
                        <LoginForm/>
                    </div>
                    <div className='col-md-6 col-xs-12'>
                        <FBLogin />
                    </div>
                </div>
            </div>

        </div>
    }

}

module.exports = routingUtils.enableRouting(LoginPage);
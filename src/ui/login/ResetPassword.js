'use strict';

const React = require('react');
const utils = require('../utils');
const requestHelper = require('../requests/requestHelper');
const config = require('../config/config');
const routingUtils = require('../../utils/routing');
const ErrorAlert = require('../forms/ErrorAlert');
const logger = require('./../logger');

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.changeHandler = utils.createChangeHandler(this);
        this.handleFormError = utils.createHandleFormError(this);
        this.reset = this.reset.bind(this)
    }

    reset() {
        const self = this;
        const email = this.state.email;
        delete self.state.mainErrorMsg;

        requestHelper
            .postFormRequest(`${config.accountsUrl}/${email}/reset`, {email}, () => {
                    routingUtils.toMainWithSuccess(self, 'Email z linkiem resetującym hasło został wysłany');
                },
                (status, errors) => {
                    this.state.successMsg = null;

                    if (status == 404) {
                        logger.debug('Account does not exist');
                        self.setState({mainErrorMsg: 'Konto nie istnieje.'});
                        return;
                    }

                    logger.error('Error while reseting password %s', errors);
                    self.state.mainErrorMsg = 'Błąd aplikacji.'
                });
    }

    render() {
        return <div className='row'>
            <div className='col-xs-12 col-md-5 col-md-offset-3'>
                <ErrorAlert msg={this.state.mainErrorMsg}/>
                <form className='form' role='form' id='login-nav'>
                    <p>Podaj email na który ma zostać wysłany link resetujący hasło</p>

                    <div className='form-group'>
                        <label className='sr-only' htmlFor='email'>Email</label>
                        <input type='email' onChange={this.changeHandler('email')} className='form-control' id='email'
                               placeholder='Email address' required/>
                    </div>

                    <div className='form-group'>
                        <input type='button' onClick={this.reset} value='Wyślij' className='btn btn-primary btn-block'/>
                    </div>
                </form>
            </div>
        </div>

    }
}

module.exports = routingUtils.enableRouting(ResetPassword);

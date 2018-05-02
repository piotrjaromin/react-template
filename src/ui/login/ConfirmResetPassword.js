'use strict';

const React = require('react');
const config = require('./../config/config');
const GenericFormField = require('../forms/GenericFormField');
const validationHelper = require('../forms/validationHelper');
const requestHelper = require('../requests/requestHelper');
const ErrorAlert = require('../forms/ErrorAlert');
const routingUtils = require('../../utils/routing');
const utils = require('../utils');
const validations = require('validationsjs');
const logger = require('./../logger');

class ConfirmAccount extends React.Component {
    constructor(params) {
        super(params);
        this.state = {};
        this.changeHandler = utils.createChangeHandler(this);
        this.handleFormError = utils.createHandleFormError(this);
        this.confirmNewPassword = this.confirmNewPassword.bind(this)
    }

    confirmNewPassword(e) {
        e.preventDefault();
        const self = this;
        const state = this.state;
        const params = utils.getParams();
        const code = params.code;
        const email = params.email;

        const errors = new validations.Validator(this.state)
            .check('password').password()
            .custom('password2', state.password == state.password2, 'Podane hasła nie są takie same')
            .getErrors();

        if (errors) {
            return this.setState({
                mainErrorMsg: 'Niektóre pola są niepoprawnie wypełnione',
                errors: errors
            });
        }

        const success = () => {
            routingUtils.toMainWithSuccess(self, 'Hasło zostało zmienione')
        };

        const failure = (status, error) => {
            let msg = error;
            logger.debug('cannot reset password status is %s', status);

            if (status == 400) {

                if (error && error.details && error.details.length > 0) {
                    self.handleFormError(validationHelper, status, error);
                    return
                }

                msg = 'Nie poprawny kod potwierdzający konto.';
            }

            routingUtils.toMainWithError(self, msg);
        };

        const data = {
            code: code,
            newPassword: this.state.password
        };
        requestHelper.request('PUT', `${config.accountsUrl}/${email}/reset`, data, success, failure)
    }

    render() {
        const errors = this.state.errors || {};

        return <div className='row'>
            <div className='col-md-6 col-md-offset-3 col-xs-12'>
                <h2>Podaj nowe hasło:</h2>
                <hr/>
                <form>
                    <ErrorAlert msg={this.state.mainErrorMsg}/>
                    <GenericFormField name='password' label='Hasło' errorMsg={errors.password} type='password'
                                      onChange={this.changeHandler('password')} value={this.state.password}/>
                    <GenericFormField name='password2' label='Powtórz Hasło' errorMsg={errors.password2} type='password'
                                      onChange={this.changeHandler('password2')} value={this.state.password2}/>

                    <div className='form-group'>
                        <button onClick={this.confirmNewPassword} type='button' className='btn btn-success pull-right'>
                            <span className='glyphicon glyphicon-plus'/>
                            Zatwierdź
                        </button>
                    </div>
                </form>
            </div>
        </div>
    }
}

module.exports = routingUtils.enableRouting(ConfirmAccount);
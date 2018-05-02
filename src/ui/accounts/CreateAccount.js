"use strict";

const React = require('react');
const config = require('./../config/config');
const GenericFormField = require('../forms/GenericFormField');
const validationHelper = require('../forms/validationHelper');
const requestHelper = require('../requests/requestHelper');
const ErrorAlert = require("../forms/ErrorAlert");
const loginUtil = require('../login/utils');

const validations = require('../../validations/validations');
const routingUtils = require('../../utils/routing');
const utils = require('../utils');

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.changeHandler = utils.createChangeHandler(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handleFormError = utils.createHandleFormError(this);
    }

    handleCreateAccount(e) {
        e.preventDefault();
        const self = this;
        const state = this.state;

        const errors = new validations.Validator(state)
            .check("password").notBlank()
            .custom("password2", state.password == state.password2, "Podane hasła nie są takie same")
            .check("email").email()
            .check("firstName").notBlank()
            .check("lastName").notBlank()
            .getErrors();

        if (errors) {
            return this.setState({
                mainErrorMsg: "Niektóre pola są niepoprawnie wypełnione",
                errors: errors
            });
        }

        delete this.state.errors;
        delete this.state.mainErrorMsg;
        requestHelper.postFormRequest(config.accountsUrl, this.state, function () {
            routingUtils.toMainWithSuccess(self, "Wiadomość z linkiem aktywacyjnym została wysłana na " + state.email);
        }, () => {
            //TODO handle
        });
    }

    render() {
        const errors = this.state.errors || {};

        if (loginUtil.isLoggedIn()) {
            this.props.router.push({pathname: '/'});
            return <div></div>;
        }

        return <div className="row">
            <div className="col-md-6 col-md-offset-3 col-xs-12">
                <h2>Załóż nowe konto:</h2>
                <hr/>
                <form>
                    <ErrorAlert msg={this.state.mainErrorMsg}/>
                    <GenericFormField name="email" label="E-mail" errorMsg={errors.email} onChange={this.changeHandler("email")}
                                      value={this.state.email}/>
                    <GenericFormField name="password" label="Hasło" errorMsg={errors.password} type="password"
                                      onChange={this.changeHandler("password")} value={this.state.password}/>
                    <GenericFormField name="password2" label="Powtórz Hasło" errorMsg={errors.password2} type="password"
                                      onChange={this.changeHandler("password2")} value={this.state.password2}/>
                    <GenericFormField name="firstName" label="Imię" errorMsg={errors.firstName}
                                      onChange={this.changeHandler("firstName")} value={this.state.firstName}/>
                    <GenericFormField name="lastName" label="Nazwisko" errorMsg={errors.lastName}
                                      onChange={this.changeHandler("lastName")} value={this.state.lastName}/>

                    <div className="form-group">
                        <button onClick={this.handleCreateAccount} type="button" className="btn btn-success pull-right">
                            <span className="glyphicon glyphicon-plus"/>
                            Zalóż konto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    }
}

module.exports = routingUtils.enableRouting(CreateAccount);

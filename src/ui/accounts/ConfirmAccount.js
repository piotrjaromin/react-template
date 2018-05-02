"use strict";

const React = require('react');
const config = require('./../config/config');
const GenericFormField = require('../forms/GenericFormField');
const validationHelper = require('../forms/validationHelper');
const requestHelper = require('../requests/requestHelper');
const ErrorAlert = require("../forms/ErrorAlert");
const routingUtils = require('../../utils/routing');
const utils = require('../utils');

class ConfirmAccount extends React.Component {
    constructor(params) {
        super(params);
        this.state = {}
    }

    componentDidMount() {
        const params = utils.getParams();
        const code = params.code;
        const email = params.email;
        const self = this;

        const success = () => {
            routingUtils.toMainWithSuccess(self, "Konto zostało aktywowane");
        };

        const failure = (status, error) => {
            if (status == 400) {
                self.setState({error: "Nie poprawny kod potwierdzający konto."});
                return;
            }
            self.setState({error})
        };

        requestHelper.request("PUT", `${config.accountsUrl}/${email}/confirm`, {code}, success, failure)
    }

    render() {

        let msg = "Konto zaraz zostanie aktywowane...";
        if (this.state.error) {
            msg = this.state.error
        }

        return <div>
            {msg}
        </div>
    }
}

module.exports = routingUtils.enableRouting(ConfirmAccount);
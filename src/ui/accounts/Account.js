"use strict";

const React = require('react');
const logger = require('./../../logger');
const config = require('./../config/config');
const moment = require('moment');
const requestHelper = require('../requests/requestHelper');
const routingUtils = require('../../utils/routing');

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.fetchAccount = this.fetchAccount.bind(this);
    }

    fetchAccount() {
        let self = this;
        let email = this.props.params.account;

        const errorHandler = xhr => {
            logger.info("Fails " + xhr + " " + xhr.status);
            routingUtils.toMainWithError(self, "Problem z pobraniem konta.")
        };

        const successHandler = account => {
            self.setState({account: account});
        };

        requestHelper.getRequest(`${config.accountsUrl}/${email}`, successHandler, errorHandler);
    }

    componentDidMount() {
        this.fetchAccount();
    }

    render() {

        const account = this.state.account || {};

        return <div className="row">
            <div className="row">
                <div className="col-md-2"><p>E-mail:</p></div>
                <div className="col-md-9 pull-left"><p>{account.email}</p></div>
            </div>
            <div className="row">
                <div className="col-md-2"><p>Imie:</p></div>
                <div className="col-md-9 pull-left"><p>{account.firstName}</p></div>
            </div>
            <div className="row">

                <div className="col-md-2"><p>Nazwisko:</p></div>
                <div className="col-md-9 pull-left"><p>{account.lastName}</p></div>
            </div>
            <div className="row">
                <div className="col-md-2"><p>Utworzono:</p></div>
                <div className="col-md-9 pull-left"><p>{moment(account.createdAt).format("DD-MM-YYYY, HH:MM")}</p></div>
            </div>
        </div>
    }
}

module.exports = routingUtils.enableRouting(Account);

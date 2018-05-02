'use strict';

require('./../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./../node_modules/bootstrap/dist/js/bootstrap.min.js');
require('./styles/main.scss');

const React = window.React = require('react'),
    ReactDOM = require('react-dom'),
    Footer = require('./ui/Footer'),
    Content = require('./ui/Content'),
    Navigation = require('./ui/Navigation'),
    TestContent = require('./ui/SampleTest'),
    mountNode = document.getElementById('app');

let Route = require('react-router').Route;
let Router = require('react-router').Router;
let IndexRoute = require('react-router').IndexRoute;
let hashHistory = require('react-router').hashHistory;

let LoginPage = require('./ui/login/LoginPage');
let ResetPassword = require('./ui/login/ResetPassword');
let ConfirmResetPassword = require('./ui/login/ConfirmResetPassword');


class App extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        window.location.href = '/';
    }

    render() {
        return <div>
            <Navigation refresh={this.refresh}/>
            <div>
                {this.props.children}
                <Footer/>
            </div>
        </div>
    }
}

class Container extends React.Component {

    render() {
        return <div className="container">
            {this.props.children}
        </div>
    }
}

ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Content}/>
                <Route path="" component={Container}>
                <Route path="login" component={LoginPage}/>
                <Route path="resetPassword" component={ResetPassword}/>
                <Route path="confirmResetPassword" component={ConfirmResetPassword}/>
                <Route path="offers" component={TestContent}/>
                <Route path="companies" component={TestContent}/>
            </Route>
        </Route>
    </Router>,
    mountNode);

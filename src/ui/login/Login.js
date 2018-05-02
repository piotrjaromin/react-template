'use strict';

const React = require('react');
const Link = require('react-router').Link;
const Logout = require('./Logout');
const loginUtils = require('./utils');

let DropDownButton = React.createClass({

    render(){
        return <a href='#' className='dropdown-toggle' role='button' aria-expanded='false' aria-haspopup='true'
                  data-toggle='dropdown'>
            <b>{this.props.label}</b>
            <span className='caret'/>
        </a>;
    }
});


let DropDownWrapper = React.createClass({
    render() {
        return <ul className='nav navbar-nav navbar-right'>
            <li><p className='navbar-text'>{this.props.prefixLabel}</p></li>
            <li className='dropdown'>
                <DropDownButton label={this.props.label}/>
                <ul id='login-dp' className='dropdown-menu'>
                    <li>
                        {this.props.children}
                    </li>
                </ul>
            </li>
        </ul>
    }
});

let AlreadyLoggedin = React.createClass({

    render(){
        const email = localStorage.getItem('email');
        return <DropDownWrapper prefixLabel='Witaj,' label={email}>
            <div className='form-group'>
                <Link to='companies/add'>
                    <span className='btn-block text-center'>
                    Jestem Fachowcem
                    </span>
                </Link>
            </div>

            <div className='form-group'>
                <Link to={'/accounts/' + email }>
                    <span className='btn-block text-center'>
                    Moje konto
                    </span>
                </Link>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <Logout refresh={this.props.refresh}/>
                </div>
            </div>
        </DropDownWrapper>
    }
});


let Login = React.createClass({

    render() {
        if (loginUtils.isLoggedIn()) {
            return <AlreadyLoggedin refresh={this.props.refresh}/>
        } else {
            return <ul className='nav navbar-nav navbar-right'>
                <li>
                    <Link to='/login' activeClassName='active' onlyActiveOnIndex>
                        <span className='btn-block text-center'>Logowanie</span>
                    </Link>
                </li>
            </ul>
        }

    }
});

module.exports = Login;

'use strict';

let Link = require('react-router').Link;
const React = require('react');
const Login = require('./login/Login');

class Navigation extends React.Component {
    render() {
        return <div className="container">
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">Tuba</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/offers" className="nav-link" activeClassName="active" onlyActiveOnIndex>Gorące</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/companies" className="nav-link" activeClassName="active" onlyActiveOnIndex>Najnowsze</Link>
                        </li>
                    </ul>
                    <Login refresh={this.props.refresh}/>
                </div>
            </nav>
        </div>
    }
}

module.exports = Navigation;

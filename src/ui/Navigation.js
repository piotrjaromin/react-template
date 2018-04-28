'use strict';

let Link = require('react-router').Link;
let React = require('react');

class Navigation extends React.Component {
    render() {
        return <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Home Site</a>
                </div>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="nav navbar-nav">
                        <li className="center">
                            <Link to="/offers" activeClassName="active" onlyActiveOnIndex>Offers</Link>
                        </li>
                        <li className="center">
                            <Link to="/companies" activeClassName="active" onlyActiveOnIndex>Companies</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    }
}

module.exports = Navigation;

'use strict';

let Link = require('react-router').Link;
let React = require('react');

class Navigation extends React.Component {
    render() {
        return <div class="container">
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/offers" className="nav-link" activeClassName="active" onlyActiveOnIndex>Offers</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/companies" className="nav-link" activeClassName="active" onlyActiveOnIndex>Companies</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    }
}

module.exports = Navigation;

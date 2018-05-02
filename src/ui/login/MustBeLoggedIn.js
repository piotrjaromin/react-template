'use strict';

const React = require('react');
const Link = require("react-router/lib/Link");

class MustBeLoggedIn extends React.Component {

    render() {
        return <div className="Row">

            <p className="text-center">
                Musisz być zalogowany, <Link to="/login" activeClassName="active">kliknij tutaj</Link>.
            </p>
        </div>
    }
}


module.exports = MustBeLoggedIn;
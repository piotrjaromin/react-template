'use strict';
const React = require('react');

const Logout = React.createClass({

    logout(e){
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.props.refresh(false);
    },

    render(){

        return <div className="bottom text-center">
                <a href="#" onClick={this.logout}>Wyloguj</a>
            </div>
    }
});


module.exports = Logout;

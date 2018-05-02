'use strict';

const React = require('react');

class ErrorAlert extends React.Component {

    render() {

        if ( !this.props.msg || this.props.msg.length === 0) {
            return null;
        }

        return <div className="row">
            <div className="alert text-center alert-danger">
                {this.props.msg}
            </div>
        </div>
    }
}

module.exports = ErrorAlert;

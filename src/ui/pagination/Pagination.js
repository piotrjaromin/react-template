'use strict';

const React = require('react');
const logger = require('./../../logger');


class Pagination extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="text-center">
            <p><span className="btn btn-default" onClick={this.props.handlePagination}>Pokaż więcej &raquo;</span></p>
        </div>
    }
}

module.exports = Pagination;

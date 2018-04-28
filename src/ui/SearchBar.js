'use strict';

const React = require('react');

class SearchBar extends React.Component {

    render() {
        return <div className="well">
            <h4>{this.props.label || ""}</h4>
            <div className="input-group">
                <input type="text" className="form-control" onChange={this.props.handleSearch}/>
                <span className="input-group-btn">
                            <button className="btn btn-default" type="button">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
            </div>
        </div>
    }
};

module.exports = SearchBar;

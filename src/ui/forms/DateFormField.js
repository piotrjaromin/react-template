"use strict";

require('react-datepicker/dist/react-datepicker.css');

const React = require('react');
const DatePicker = require('react-datepicker');
const moment = require('moment');


class DateFormField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(date) {
        this.setState({value: date});
        this.props.onChange( { target : { value : date} });
    }

    render() {

        let handler = this.handleInput;
        let label = this.props.label;
        let name = this.props.name;
        let defVal = this.props.value || "";
        let errorMsg = this.props.errorMsg || "";

        let errorSpans = null;
        let formGroupCss = "form-group row";

        if (errorMsg) {
            errorSpans = <div><span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"/>
                <span id="inputError2Status" className="sr-only">(error)</span></div>;

            formGroupCss += " has-error has-feedback"
        }

        return <div className={formGroupCss}>
            <div className="row">
                <label htmlFor={name} className="col-xs-2 col-form-label">{label}</label>
                <div className="col-xs-10">
                    <DatePicker selected={defVal} onChange={handler} locale="pl_PL"/>
                </div>
                {errorSpans}
            </div>
            <div className="row">
                <div className="col-xs-2"/>
                <div className="col-xs-10">
                    <p className="text-error"> {errorMsg} </p>
                </div>
            </div>
        </div>

    }
}

module.exports = DateFormField;

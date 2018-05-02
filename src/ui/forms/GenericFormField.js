'use strict';

let React = require('react');

class GenericFormField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(e) {
        this.setState({value: e.target.value});
        this.props.onChange(e);
    }

    render() {

        let handler = this.handleInput;
        let label = this.props.label;
        let name = this.props.name;
        let defVal = this.props.value || '';
        let type = this.props.type || 'text';
        let isTextArea = this.props.isTextArea || false;
        let errorMsg = this.props.errorMsg || '';
        let minVal =this.props.minVal;

        let input = null;
        if (isTextArea) {
            input = <textarea className='form-control' type={type} value={defVal} id={name} onChange={handler}/>
        } else {
            input = <input className='form-control' type={type} value={defVal} id={name} onChange={handler} min={minVal} />
        }

        let errorSpans = null;
        let formGroupCss = 'form-group row';

        if (errorMsg) {
            errorSpans = <div><span className='glyphicon glyphicon-remove form-control-feedback' aria-hidden='true'/>
                <span id='inputError2Status' className='sr-only'>(error)</span></div>;

            formGroupCss += ' has-error has-feedback'
        }

        return <div className={formGroupCss}>
            <div className='row'>
                <label htmlFor={name} className='col-xs-2 col-form-label'>{label}</label>
                <div className='col-xs-10'>
                    {input}
                </div>
                {errorSpans}
            </div>
            <div className='row'>
                <div className='col-xs-2'/>
                <div className='col-xs-10'>
                    <p className='text-error'> {errorMsg} </p>
                </div>
            </div>
        </div>

    }
}

module.exports = GenericFormField;

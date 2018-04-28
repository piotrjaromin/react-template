'use strict';

module.exports.arrayUnique = function (array, fieldName) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i][fieldName] === a[j][fieldName])
                a.splice(j--, 1);
        }
    }

    return a;
};


module.exports.createChangeHandler = (self) => {

    return fieldName => {
        return e => {
            const state = {};

            let value = e.target.value;
            if (e.target.type === "number") {
                value = parseInt(value);
            }

            state[fieldName] = value;
            if (self.state.errors && self.state.errors[fieldName]) {
                state.errors = self.state.errors;
                state.errors[fieldName] = null
            }

            self.setState(state);
        }
    }
};

module.exports.createHandleFormError = (self) => {

    return (validationHelper, status, errors) => {
        if (status == 400 || status == 404) {
            self.setState({
                mainErrorMsg: errors.message,
                errors: validationHelper.errorForFields(errors.details)
            });
        }
    }
};


module.exports.getParams = () => {
    const hash = window.location.hash;

    const paramsSplited = hash.split(/\?(.+)/)[1].split("&");

    const params = {};
    paramsSplited.forEach(el => {
        const [key, val] = el.split("=");
        params[key] = val
    });

    return params;
};
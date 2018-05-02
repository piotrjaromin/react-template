'use strict';


function rowFor2Fields(data, desc1, fieldName1, desc2, fieldName2) {

    const column = (desc, name) => {

        if (!data[name]) {
            return;
        }

        return <div className="col-md-6 col-xs-12">
            <div className="row"><b>{desc}</b></div>
            <div className="row"><p> {data[name]}</p></div>
        </div>
    };

    return <div className="row zero-margin">
        {column(desc1, fieldName1)}
        {column(desc2, fieldName2)}
    </div>
}


function rowFor1Field(data, desc, fieldName) {

    return <div className="row zero-margin">
        <div className="col-md-12 col-xs-12">
            <div className="row">
                <b>{desc}</b>
            </div>
            <div className="row">
                {data[fieldName]}
            </div>
        </div>
    </div>
}


module.exports.rowFor2Fields = rowFor2Fields;
module.exports.rowFor1Field = rowFor1Field;
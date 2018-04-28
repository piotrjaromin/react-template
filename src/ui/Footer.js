'use strict';

const React = require('react');
const Col = require('react-bootstrap').Col;

class Footer extends React.Component {
    render() {
        return <footer>
            <hr/>
            <Col lg={12}>
                <p>Copyright &copy; 2016</p>
            </Col>
        </footer>
    }
}


module.exports = Footer;

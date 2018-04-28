'use strict';

const React = require('react');
const SuccessAlert = require('./alerts/SuccessAlert');
const ErrorAlert = require('./alerts/ErrorAlert');

const Col = require('react-bootstrap').Col;
const Row = require('react-bootstrap').Row;
const Jumbotron = require('react-bootstrap').Jumbotron;
const Button = require('react-bootstrap').Button;

class Content extends React.Component {
    render() {
        let successMsg = this.props.location.state && this.props.location.state.msg;
        let errorMsg = this.props.location.state && this.props.location.state.errorMsg;

        return <div>

            <SuccessAlert msg={successMsg}/>
            <ErrorAlert msg={errorMsg}/>

            <Jumbotron>
                <div className="container">
                    <h2>Welcome Page</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                        Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                </div>
            </Jumbotron>

            <div className="container">
                <Row>
                    <Col md={4}>
                        <h2>Donec id elit</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                            mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                            mollis euismod. Donec sed odio dui. </p>
                        <p><Button bsStyle="default" >Details &raquo;</Button></p>
                    </Col>
                    <Col md={4}>
                        <h2>Donec id elit</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor
                            mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna
                            mollis euismod. Donec sed odio dui. </p>
                        <p><Button bsStyle="default" >Details &raquo;</Button></p>
                    </Col>
                    <Col md={4}>
                        <h2>Donec id elit</h2>
                        <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula
                            porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
                            ut fermentum massa justo sit amet risus.</p>
                        <p><Button bsStyle="default" >Details &raquo;</Button></p>
                    </Col>
                </Row>
            </div>
        </div>
    }
}

module.exports = Content;

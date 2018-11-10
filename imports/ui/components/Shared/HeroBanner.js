import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Row} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import {Link} from "react-router-dom";
import './HeroBanner.less';

class HeroBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            tagline: props.tagline,
            buttonText: props.buttonText
        }
    }

    render() {
        //default to company content
        let title = this.props.title;
        let tagline = this.props.tagline;
        let buttonText = this.props.buttonText;

        return (
            <div>
                <Row className="hero-banner">
                    <Col xs={12}>
                        <div className="hero-text">
                            <h1 className="hero-title">{title}</h1>

                            {
                                tagline
                                    ?
                                    <span className="hero-tagline">{tagline}</span>
                                    :
                                    ''
                            }

                        </div>


                        {
                            buttonText
                                ?
                                <Grid fluid>
                                    <Row className="hero-sign-up">
                                        <Col xs={12}>
                                            <div className="sign-up">
                                                <Link to="/company-signup" className="btn btn-bg-hero btn-wide">{buttonText}</Link>;
                                            </div>
                                        </Col>
                                    </Row>
                                </Grid>
                                :
                                ''
                        }
                    </Col>
                </Row>

            </div>
        );
    }
}

HeroBanner.propTypes = {
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    buttonText: PropTypes.string
};

export default HeroBanner;

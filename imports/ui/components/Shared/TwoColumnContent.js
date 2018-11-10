import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Image, Row} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import './TwoColumnContent.less';

class TwoColumnContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            paragraph: props.paragraph,         //expecting an element, either one p tag or a div of numerous p tags
            image: props.image,
            imagePosition: props.imagePosition  //expecting either "left" or "right"
        }
    }

    render() {
        //default to company content
        let title = this.props.title;
        let paragraph = this.props.paragraph;
        let image = this.props.image;
        let imagePosition = this.props.imagePosition;

        return (
            imagePosition === "left"
                ?
                //image left, text right
                <Row className="two-column-content image-left">
                    <Col sm={6}>
                        <Image src={image} responsive />
                    </Col>

                    <Col sm={6}>
                        <h2>
                            {title}
                        </h2>
                        {paragraph}
                    </Col>
                </Row>

                :

                // text left, image right
                <Row className="two-column-content image-right">
                    <Col sm={6}>
                        <h2>
                            {title}
                        </h2>
                        {paragraph}
                    </Col>

                    <Col sm={6}>
                        <Image src={image} responsive />
                    </Col>
                </Row>

        );
    }
}

TwoColumnContent.propTypes = {
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.object.isRequired,
    imagePosition: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default TwoColumnContent;

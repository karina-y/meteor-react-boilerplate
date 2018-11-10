import React from 'react';
import { Grid,
         Row,
         Col }
    from 'react-bootstrap';
import './NotFound.less';

const NotFound = () => (
    <Grid className="not-found-container">
        <Grid className="NotFound">
            <Row>
                <Col sm={6} className="text-container">
                    <p>WAY TO GO</p>
                    <p>YOU BROKE TODOBOILER_appName</p>
                </Col>

                <Col sm={6} className="image-container">
                    <img className="loading-gif" src="/TODOBOILER_image.jpeg"/>
                </Col>
            </Row>
        </Grid>
    </Grid>
);

export default NotFound;

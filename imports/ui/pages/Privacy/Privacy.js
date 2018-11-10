import React from 'react';
import Page from '../Page/Page';
import { Grid } from 'react-bootstrap';
import WhiteBoxBody from "../../components/Shared/Wrappers/WhiteBoxBody";

const Privacy = () => (
    <WhiteBoxBody compensateNav="single" size="md">
        <div className="Privacy">
            <Page
                title="Privacy Policy"
                subtitle="Last updated July 28, 2017"
                page="candidate-privacy"
            />
        </div>
    </WhiteBoxBody>
);

export default Privacy;

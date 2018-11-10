import React from 'react';
import Page from '../Page/Page';
import { Grid } from 'react-bootstrap';

const ExamplePage = () => (
  <Grid>
    <div className="ExamplePage">
      <Page
        title="My Example Page"
        subtitle="A subtitle for my example page."
        page="example-page"
      />
    </div>
  </Grid>
);

export default ExamplePage;

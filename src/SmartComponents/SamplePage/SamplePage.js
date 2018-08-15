import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './sample-page.scss';

import { Grid, GridItem } from '@patternfly/react-core';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class SamplePage extends Component {

    render() {
        return (
            <Grid>
                <GridItem span={4}>Test</GridItem>
                <GridItem span={4}>Tester</GridItem>
            </Grid>
        );
    }
}

export default withRouter(SamplePage);

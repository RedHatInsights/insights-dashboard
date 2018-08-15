import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, GridItem } from '@patternfly/react-core';
import { Section } from '@red-hat-insights/insights-frontend-components';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class Dashboard extends Component {

    render() {
        return (
            <Section>
                <Grid>
                    <GridItem span={4}>Advisor</GridItem>
                    <GridItem span={4}>Security</GridItem>
                    <GridItem span={4}>Compliance</GridItem>
                </Grid>
                <Grid>
                    <GridItem span={4}>CMaaS</GridItem>
                    <GridItem span={4}>Inventory</GridItem>
                    <GridItem span={4}>Reports</GridItem>
                </Grid>
            </Section>
        );
    }
}

export default withRouter(Dashboard);

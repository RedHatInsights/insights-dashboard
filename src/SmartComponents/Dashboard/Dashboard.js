import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, Grid, GridItem } from '@patternfly/react-core';
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
            <React.Fragment>
                <Section type='content'>
                    <Grid gutter='md'>
                        <GridItem span={4}>
                            <Card>
                                <CardHeader>Advisor</CardHeader>
                                <CardBody>Chart Stuff</CardBody>
                            </Card>
                        </GridItem>
                        <GridItem span={4}>
                            <Card>
                                <CardHeader>Security</CardHeader>
                                <CardBody>Chart Stuff</CardBody>
                            </Card>
                        </GridItem>
                        <GridItem span={4}>
                            <Card>
                                <CardHeader>Compliance</CardHeader>
                                <CardBody>Chart Stuff</CardBody>
                            </Card>
                        </GridItem>
                    </Grid>
                </Section>
                <Section type='content'>
                    <Grid gutter='md'>
                        <GridItem span={4}>
                            <Card>
                                <CardHeader>CMaaS</CardHeader>
                                <CardBody>Chart Stuff</CardBody>
                            </Card>
                        </GridItem>
                        <GridItem span={4}>
                            <Card>
                                <CardHeader>Inventory</CardHeader>
                                <CardBody>Chart Stuff</CardBody>
                            </Card>
                        </GridItem>
                        <GridItem span={4}>
                            <Card>
                                <CardHeader>Reports</CardHeader>
                                <CardBody>Chart Stuff</CardBody>
                            </Card>
                        </GridItem>
                    </Grid>
                </Section>
            </React.Fragment>
        );
    }
}

export default withRouter(Dashboard);

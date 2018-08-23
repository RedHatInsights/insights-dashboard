import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, Grid, GridItem } from '@patternfly/react-core';
import { Section } from '@red-hat-insights/insights-frontend-components';
import asyncComponent from '../../Utilities/asyncComponent';

const GaugeSection = asyncComponent(() => import ('../../PresentationalComponents/GaugeSection/GaugeSection.js'));

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
            <Section type='content'>
                <Grid gutter='md' sm={6} lg={4}>
                    <GridItem>
                        <Card>
                            <CardHeader>Advisor</CardHeader>
                            <CardBody>
                                <GaugeSection label='advisor' value={75} identifier='advisor-gauge'>
                                    <ul>
                                        <li>10 New</li>
                                        <li>7 Critical</li>
                                        <li>3 Warning</li>
                                        <li>View All</li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card>
                            <CardHeader>Security</CardHeader>
                            <CardBody>
                                <GaugeSection label='security' value={15} identifier='security-gauge'>
                                    <ul>
                                        <li>10 New</li>
                                        <li>7 Critical</li>
                                        <li>3 Warning</li>
                                        <li>View All</li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card>
                            <CardHeader>Compliance</CardHeader>
                            <CardBody>
                                <GaugeSection label='compliance' value={85} identifier='compliance-gauge'>
                                    <ul>
                                        <li>10 New</li>
                                        <li>7 Critical</li>
                                        <li>3 Warning</li>
                                        <li>View All</li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card>
                            <CardHeader>CMaaS</CardHeader>
                            <CardBody>
                                <GaugeSection label='cmaas' value={45} identifier='cmaas-gauge'>
                                    <ul>
                                        <li>10 New</li>
                                        <li>7 Critical</li>
                                        <li>3 Warning</li>
                                        <li>View All</li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card>
                            <CardHeader>Inventory</CardHeader>
                            <CardBody>
                                <GaugeSection label='inventory' value={67} identifier='inventory-gauge'>
                                    <ul>
                                        <li>10 New</li>
                                        <li>7 Critical</li>
                                        <li>3 Warning</li>
                                        <li>View All</li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card>
                            <CardHeader>Reports</CardHeader>
                            <CardBody>
                                <GaugeSection label='reports' value={95} identifier='reports-gauge'>
                                    <ul>
                                        <li>10 New</li>
                                        <li>7 Critical</li>
                                        <li>3 Warning</li>
                                        <li>View All</li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </Section>
        );
    }
}

export default withRouter(Dashboard);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, Grid, GridItem } from '@patternfly/react-core';
import { Section } from '@red-hat-insights/insights-frontend-components';
import asyncComponent from '../../Utilities/asyncComponent';

import './_dashboard.scss';

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
                        <Card className='card-gauge'>
                            <CardHeader>Advisor</CardHeader>
                            <CardBody>
                                <GaugeSection label='advisor' value={75} identifier='advisor-gauge'>
                                    <ul>
                                        <li className='li-emphasis'>
                                            <strong>10</strong>
                                            <span>New</span>
                                        </li>
                                        <li>
                                            <strong>7</strong>
                                            <span>Critical</span>
                                        </li>
                                        <li>
                                            <strong>3</strong>
                                            <span>Warning</span>
                                        </li>
                                        <li className='link--view-all'>
                                            <a href={`/insights/platform/actions/`}>
                                                View All
                                                <i className='fas fa-external-link-alt'/>
                                            </a>
                                        </li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card className='card-gauge'>
                            <CardHeader>Compliance</CardHeader>
                            <CardBody>
                                <GaugeSection label='compliance' value={100} identifier='compliance-gauge'>
                                    <ul>
                                        <li className='li-emphasis'>
                                            <strong className='block'>0</strong>
                                            <span>Noncompliant Systems</span>
                                        </li>
                                        <li className='link--view-all'>
                                            <a>
                                                View All
                                                <i className='fas fa-external-link-alt'/>
                                            </a>
                                        </li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card className='card-gauge'>
                            <CardHeader>Subscriptions</CardHeader>
                            <CardBody>
                                <GaugeSection label='subscriptions' value={25} identifier='subscriptions-gauge'>
                                    <ul>
                                        <li>
                                            <strong>7</strong>
                                            <span>Expired Licenses</span>
                                        </li>
                                        <li>
                                            <strong>2</strong>
                                            <span>Unused Subscriptions</span>
                                        </li>
                                        <li className='link--view-all'>
                                            <a>
                                                View All
                                                <i className='fas fa-external-link-alt'/>
                                            </a>
                                        </li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card className='card-gauge'>
                            <CardHeader>Vulnerabilities</CardHeader>
                            <CardBody>
                                <GaugeSection label='vulnerabilities' value={67} identifier='vulnerabilities-gauge'>
                                    <ul>
                                        <li className='li-emphasis'>
                                            <strong>10</strong>
                                            <span>New</span>
                                        </li>
                                        <li>
                                            <strong>5</strong>
                                            <span>High Impact</span>
                                        </li>
                                        <li>
                                            <strong>5</strong>
                                            <span>Medium Impact</span>
                                        </li>
                                        <li className='link--view-all'>
                                            <a>
                                                View All
                                                <i className='fas fa-external-link-alt'/>
                                            </a>
                                        </li>
                                    </ul>
                                </GaugeSection>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card className='card-gauge'>
                            <CardHeader>Costing</CardHeader>
                            <CardBody>
                                <GaugeSection label='costing' value={92} identifier='costing-gauge'>
                                    <ul>
                                        <li className='li-emphasis'>
                                            <strong className='block'>$15,778.00</strong>
                                            <span>All AWS Accounts</span>
                                        </li>
                                        <li className='link--view-all'>
                                            <a>
                                                View All
                                                <i className='fas fa-external-link-alt'/>
                                            </a>
                                        </li>
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

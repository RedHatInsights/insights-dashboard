import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, Title } from '@patternfly/react-core';
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
            <React.Fragment>
                <Section className='pf-l-page__main-section pf-m-dark'>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'2xl'}>Health of Your Infrastructure test</Title>
                </Section>
                <Section className='pf-l-page__main-section ins-l-dashboard pf-m-dark'>
                    <Card className='pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Advisor</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeSection label='advisor' width={250} height={250} value={42}
                                identifier='advisor-gauge' change='increase' affect='negative'
                                changeValue='4' timeframe='30' className='pf-m-gutter'>
                                <ul className='ins-c-gauge-widget__legend-list'>
                                    <li className='ins-c-gauge-widget__legend-list-item ins-m-special'>
                                        <span className='ins-c-gauge-widget__legend-list-count ins-m-emphasis'>10</span>
                                        <span className='ins-c-gauge-widget__legend-list-type ins-m-dark'>New</span>
                                    </li>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>7</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>Critical</span>
                                    </li>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count'>3</span>
                                        <span className='ins-c-gauge-widget__legend-list-type'>Warning</span>
                                    </li>
                                </ul>
                                <a className='ins-c-icon-inline' href={`/insights/platform/advisor/`}>
                                    <span>View All</span>
                                    <i className='fas fa-external-link-alt'/>
                                </a>
                            </GaugeSection>
                        </CardBody>
                    </Card>
                    <Card className='card-gauge pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Compliance</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeSection label='compliance' width={250} height={250}
                                value={100} identifier='compliance-gauge' change='decrease' affect='positive'
                                changeValue='11' timeframe='30'>
                                <ul className='ins-c-gauge-widget__legend-list'>
                                    <li className='ins-c-gauge-widget__legend-list-item'>
                                        <span className='ins-c-gauge-widget__legend-list-count ins-m-emphasis'>0</span>
                                        <span className='ins-c-gauge-widget__legend-list-type
                                            ins-m-dark'>Noncompliant systems</span>
                                    </li>
                                </ul>
                                <a className='ins-c-icon-inline' href={`/insights/platform/compliance/`}>
                                    <span>View All</span>
                                    <i className='fas fa-external-link-alt'/>
                                </a>
                            </GaugeSection>
                        </CardBody>
                    </Card>
                    <Card className='card-gauge pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Subscriptions</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeSection label='subscriptions' width={250} height={250}
                                value={25} identifier='subscriptions-gauge' change='decrease' affect='negative'
                                changeValue='15' timeframe='30'>
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
                                        <a href={`/insights/platform/subscriptions/`}>
                                            View All
                                            <i className='fas fa-external-link-alt'/>
                                        </a>
                                    </li>
                                </ul>
                            </GaugeSection>
                        </CardBody>
                    </Card>
                    <Card className='card-gauge pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Vulnerabilities</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeSection label='vulnerabilities' width={250} height={250}
                                value={67} identifier='vulnerabilities-gauge' change='increase'
                                affect='negative' changeValue='23' timeframe='30'>
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
                                        <a href={`/insights/platform/vulnerability/`}>
                                            View All
                                            <i className='fas fa-external-link-alt'/>
                                        </a>
                                    </li>
                                </ul>
                            </GaugeSection>
                        </CardBody>
                    </Card>
                    <Card className='card-gauge pf-m-dark'>
                        <CardHeader>
                            <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Costing</Title>
                        </CardHeader>
                        <CardBody>
                            <GaugeSection label='costing' width={250} height={250} value={92} identifier='costing-gauge'
                                change='increase' affect='positive' changeValue='24' timeframe='30'>
                                <ul>
                                    <li className='li-emphasis'>
                                        <strong className='block'>$15,778.00</strong>
                                        <span>All AWS Accounts</span>
                                    </li>
                                    <li className='link--view-all'>
                                        <a href={`/insights/platform/cmaas/`}>
                                            View All
                                            <i className='fas fa-external-link-alt'/>
                                        </a>
                                    </li>
                                </ul>
                            </GaugeSection>
                        </CardBody>
                    </Card>
                </Section>
            </React.Fragment>
        );
    }
}

export default withRouter(Dashboard);

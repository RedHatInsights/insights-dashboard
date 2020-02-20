/* eslint-disable no-console */
import './_dashboard.scss';
import { Card, CardHeader, CardBody, Divider, PageSection, Title } from '@patternfly/react-core';
import { Main } from '@red-hat-insights/insights-frontend-components/components/Main';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from '../../Utilities/skeletonAsyncCard';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';

const ComplianceCard = asyncComponent(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = asyncComponent(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));

const Dashboard = ({ intl }) =>
    <React.Fragment>
        <PageSection>
            <Title headingLevel="h1" size="2xl">
                Overview
            </Title>
            <div className="ins-timestamp">
                Time stamp goes here
            </div>
        </PageSection>
        <PageHeader>
            <PageHeaderTitle title={ intl.formatMessage(messages.dashboardTitle) } />
        </PageHeader>
        <Main className='ins-l-dashboard'>
            <div className="dashboard-card-group">
                <div className="dashboard-card-system-inventory">
                    <Card>
                        <CardHeader>
                            System inventory and status
                        </CardHeader>
                        <CardBody>
                            Here is a lot of test content to see how the card behaves.
                        </CardBody>
                    </Card>
                </div>
                <div className="dashboard-card-entitlements">
                    <Card>
                        <CardHeader>
                            Entitlements utilized
                        </CardHeader>
                        <CardBody>
                            Here is a lot of test content to see how the card behaves.
                        </CardBody>
                    </Card>
                </div>
                <div className="dashboard-card-operating-systems">
                    <Card>
                        <CardHeader>
                            Operating systems
                        </CardHeader>
                        <CardBody>
                            Here is a lot of test content to see how the card behaves.
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="dashboard-card-rules">
                <Card>
                    <CardHeader>
                        Rules
                    </CardHeader>
                    <CardBody>
                        Here is a lot of test content to see how the card behaves. Here is a lot of test content to see how the card behaves.
                    </CardBody>
                </Card>
            </div>
            <div className="dashboard-card-vulnerabilities">
                <Card>
                    <CardHeader>
                        Vulnerabilities
                    </CardHeader>
                    <CardBody>
                        Here is a lot of test content to see how the card behaves.
                    </CardBody>
                    <CardBody>
                        Here is a lot of test content to see how the card behaves.
                    </CardBody>
                    <CardBody>
                        Here is a lot of test content to see how the card behaves.
                    </CardBody>
                </Card>
            </div>
            <div className="dashboard-card-compliance-remediations">
                <Card>
                    <CardHeader>
                        Compliance
                    </CardHeader>
                    <CardBody>
                        Here is a lot of test content to see how the card behaves.
                    </CardBody>
                </Card>
                <Divider></Divider>
                <Card>
                    <CardHeader>
                        Remediations
                    </CardHeader>
                    <CardBody>
                        Here is a lot of test content to see how the card behaves.
                    </CardBody>
                </Card>
            </div>
            <div className="dashboard-card-custom-policies">
                <Card>
                    <CardHeader>
                        Custom policies
                    </CardHeader>
                    <CardBody>
                        Here is a lot of test content to see how the card behaves.
                    </CardBody>
                </Card>
            </div>
        </Main>
    </React.Fragment>;

Dashboard.propTypes = { intl: PropTypes.any };

export default injectIntl(Dashboard);

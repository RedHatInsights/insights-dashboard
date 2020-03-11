/* eslint-disable no-console */
import './_dashboard.scss';
import { Card } from '@patternfly/react-core/dist/js/components/Card/Card';
import { CardHeader } from '@patternfly/react-core/dist/js/components/Card/CardHeader';
import { CardBody } from '@patternfly/react-core/dist/js/components/Card/CardBody';
import { Divider } from '@patternfly/react-core/dist/js/components/Divider/Divider';
import { PageSection } from '@patternfly/react-core/dist/js/components/Page/PageSection';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { Main } from '@red-hat-insights/insights-frontend-components/components/Main';
import PropTypes from 'prop-types';
import Loading from '../../PresentationalComponents/Loading/Loading';
import React, { Suspense, lazy } from 'react';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import { TimeStamp } from './../TimeStamp/TimeStamp';

const ComplianceCard = lazy(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = lazy(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));
const SystemInventoryCard = lazy(() => import('../../SmartComponents/SystemInventory/SystemInventoryCard'));
const EntitlementsUtilizedCard = lazy(() => import('../../SmartComponents/EntitlementsUtilized/EntitlementsUtilizedCard'));
const OperatingSystemsCard = lazy(() => import('../../SmartComponents/OperatingSystems/OperatingSystemsCard'));
const CustomPoliciesCard = lazy(() => import('../../SmartComponents/CustomPolicies/CustomPoliciesCard'));
const RemediationsCard = lazy(() => import('../../SmartComponents/Remediations/RemediationsCard'));

const Dashboard = ({ intl }) =>
    <React.Fragment>
        <PageSection>
            <Title headingLevel="h1" size="2xl">
                {intl.formatMessage(messages.dashboardTitle)}
            </Title>
            <TimeStamp timestamp="Timestamp goes here" />
        </PageSection>
        <Main className='ins-l-dashboard'>
            <div className="dashboard-card-group">
                <div className="dashboard-card-system-inventory">
                    <Suspense fallback={ <Loading /> }>
                        <SystemInventoryCard/>
                    </Suspense>
                </div>
                <div className="dashboard-card-entitlements">
                    <Suspense fallback={ <Loading /> }>
                        <EntitlementsUtilizedCard/>
                    </Suspense>
                </div>
                <div className="dashboard-card-operating-systems">
                    <Suspense fallback={ <Loading /> }>
                        <OperatingSystemsCard/>
                    </Suspense>
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
                <Suspense fallback={ <Loading /> }>
                    <VulnerabilityCard/>
                </Suspense>
            </div>
            <div className="dashboard-card-compliance-remediations">
                <Suspense fallback={ <Loading /> }>
                    <ComplianceCard/>
                </Suspense>
                <Divider/>
                <Suspense fallback={ <Loading /> }>
                    <RemediationsCard/>
                </Suspense>
            </div>
            <div className="dashboard-card-custom-policies">
                <Suspense fallback={ <Loading /> }>
                    <CustomPoliciesCard/>
                </Suspense>
            </div>
        </Main>
    </React.Fragment>;

Dashboard.propTypes = { intl: PropTypes.any };

export default injectIntl(Dashboard);

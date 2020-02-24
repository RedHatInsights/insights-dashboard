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
import React from 'react';
import asyncComponent from '../../Utilities/skeletonAsyncCard';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';

const ComplianceCard = asyncComponent(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = asyncComponent(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));
const SystemInventoryCard = asyncComponent(() => import('../../SmartComponents/SystemInventory/SystemInventoryCard'));
const EntitlementsUtilizedCard = asyncComponent(() => import('../../SmartComponents/EntitlementsUtilized/EntitlementsUtilizedCard'));
const OperatingSystemsCard = asyncComponent(() => import('../../SmartComponents/OperatingSystems/OperatingSystemsCard'));
const CustomPoliciesCard = asyncComponent(() => import('../../SmartComponents/CustomPolicies/CustomPoliciesCard'));
const RemediationsCard = asyncComponent(() => import('../../SmartComponents/Remediations/RemediationsCard'));

const Dashboard = ({ intl }) =>
    <React.Fragment>
        <PageSection>
            <Title headingLevel="h1" size="2xl">
                {intl.formatMessage(messages.dashboardTitle)}
            </Title>
            <div className="ins-timestamp">
                Time stamp goes here
            </div>
        </PageSection>
        <Main className='ins-l-dashboard'>
            <div className="dashboard-card-group">
                <div className="dashboard-card-system-inventory">
                    <SystemInventoryCard/>
                </div>
                <div className="dashboard-card-entitlements">
                    <EntitlementsUtilizedCard/>
                </div>
                <div className="dashboard-card-operating-systems">
                    <OperatingSystemsCard/>
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
                <VulnerabilityCard/>
            </div>
            <div className="dashboard-card-compliance-remediations">
                <ComplianceCard/>
                <Divider></Divider>
                <RemediationsCard/>
            </div>
            <div className="dashboard-card-custom-policies">
                <CustomPoliciesCard/>
            </div>
        </Main>
    </React.Fragment>;

Dashboard.propTypes = { intl: PropTypes.any };

export default injectIntl(Dashboard);

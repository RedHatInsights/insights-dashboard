import './_dashboard.scss';
import React, { Suspense, lazy, useContext } from 'react';
import { Divider } from '@patternfly/react-core/dist/js/components/Divider/Divider';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { Main } from '@red-hat-insights/insights-frontend-components/components/Main';
import { PageSection } from '@patternfly/react-core/dist/js/components/Page/PageSection';
import PropTypes from 'prop-types';
import { TimeStamp } from './../TimeStamp/TimeStamp';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import { PermissionContext } from '../../App';
import DeniedState from '../DeniedState/DeniedState';

const AdvisorCard = lazy(() => import('../../SmartComponents/Advisor/Advisor'));
const ComplianceCard = lazy(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = lazy(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));
const SystemInventoryCard = lazy(() => import('../../SmartComponents/SystemInventory/SystemInventoryCard'));
const SubscriptionsUtilizedCard = lazy(() => import('../../SmartComponents/SubscriptionsUtilized/SubscriptionsUtilizedCard'));
const PatchManagerCard = lazy(() => import('../../SmartComponents/PatchManager/PatchManagerCard'));
const CustomPoliciesCard = lazy(() => import('../../SmartComponents/CustomPolicies/CustomPoliciesCard'));
const RemediationsCard = lazy(() => import('../../SmartComponents/Remediations/RemediationsCard'));

const Dashboard = ({ intl }) => {
    const permission = useContext(PermissionContext);
    return (
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
                            <SystemInventoryCard />
                        </Suspense>
                    </div>
                    <div className="dashboard-card-entitlements">
                        <Suspense fallback={ <Loading /> }>
                            <SubscriptionsUtilizedCard />
                        </Suspense>
                    </div>
                    <div className="dashboard-card-operating-systems">
                        <Suspense fallback={ <Loading /> }>
                            { permission.patch ? <PatchManagerCard /> : <DeniedState appName='Patch'/> }
                        </Suspense>
                    </div>
                </div>
                <div className="dashboard-card-rules">
                    <Suspense fallback={ <Loading /> }>
                        { permission.advisor ? <AdvisorCard /> : <DeniedState appName='Advisor'/> }
                    </Suspense>
                </div>
                <div className="dashboard-card-vulnerabilities">
                    <Suspense fallback={ <Loading /> }>
                        { permission.vulnerability ? <VulnerabilityCard /> : <DeniedState appName='Vulnerability'/> }
                    </Suspense>
                </div>
                <div className="dashboard-card-compliance-remediations">
                    <Suspense fallback={ <Loading /> }>
                        { permission.compliance ? <ComplianceCard /> : <DeniedState appName='Compliance'/> }
                    </Suspense>
                    <Divider />
                    <Suspense fallback={ <Loading /> }>
                        { permission.remediations ? <RemediationsCard /> : <DeniedState appName='Remediations'/> }
                    </Suspense>
                </div>
                <div className="dashboard-card-custom-policies">
                    <Suspense fallback={ <Loading /> }>
                        { permission.customPolicies ? <CustomPoliciesCard /> : <DeniedState appName='Custom Policies'/> }
                    </Suspense>
                </div>
            </Main>
        </React.Fragment>
    );
};

Dashboard.propTypes = { intl: PropTypes.any };

export default injectIntl(Dashboard);

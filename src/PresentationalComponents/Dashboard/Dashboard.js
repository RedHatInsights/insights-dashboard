import './_dashboard.scss';

import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';

import API from '../../Utilities/Api';
import DeniedState from '../DeniedState/DeniedState';
import { Divider } from '@patternfly/react-core/dist/js/components/Divider/Divider';
import Loading from '../../PresentationalComponents/Loading/Loading';
import { Main } from '@redhat-cloud-services/frontend-components/components/Main';
import NoSystems from '../NoSystems/NoSystems';
import { PageSection } from '@patternfly/react-core/dist/js/components/Page/PageSection';
import { PermissionContext } from '../../App';
import { SAP_FETCH_URL } from '../../AppConstants';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { workloadsPropType } from '../../Utilities/Common';

const AdvisorCard = lazy(() => import('../../SmartComponents/Advisor/Advisor'));
const ComplianceCard = lazy(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = lazy(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));
const SystemInventoryCard = lazy(() => import('../../SmartComponents/SystemInventory/SystemInventoryCard'));
const SubscriptionsUtilizedCard = lazy(() => import('../../SmartComponents/SubscriptionsUtilized/SubscriptionsUtilizedCard'));
const PatchManagerCard = lazy(() => import('../../SmartComponents/PatchManager/PatchManagerCard'));
const RemediationsCard = lazy(() => import('../../SmartComponents/Remediations/RemediationsCard'));

const Dashboard = ({ workloads }) => {
    const permission = useContext(PermissionContext);
    const intl = useIntl();
    const [supportsSap, setSupportsSap] = useState(true);

    useEffect(() => {
        const fetchSapSystems = async () => {
            try {
                const response = await API.get(SAP_FETCH_URL);
                setSupportsSap(response.data.results?.find(({ value }) => value)?.count > 0);
            } catch (error) {
                throw `${error}`;
            }
        };

        fetchSapSystems();
    }, []);

    return permission.hasSystems ?
        (!workloads?.SAP?.isSelected) || (workloads?.SAP?.isSelected && supportsSap) ?
            <React.Fragment>
                <PageSection>
                    <Title headingLevel="h1" size="2xl">
                        {intl.formatMessage(messages.dashboardTitle)}
                    </Title>
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
                                {permission.subscriptions ? <SubscriptionsUtilizedCard /> : <DeniedState appName='Subscription Watch' />}
                            </Suspense>
                        </div>
                        <div className="dashboard-card-operating-systems">
                            <Suspense fallback={ <Loading /> }>
                                {permission.patch ? <PatchManagerCard /> : <DeniedState appName='Patch' />}
                            </Suspense>
                        </div>
                    </div>
                    <div className="dashboard-card-rules">
                        <Suspense fallback={ <Loading /> }>
                            {permission.advisor ? <AdvisorCard /> : <DeniedState appName='Advisor' />}
                        </Suspense>
                    </div>
                    <div className="dashboard-card-vulnerabilities">
                        <Suspense fallback={ <Loading /> }>
                            {permission.vulnerability ? <VulnerabilityCard /> : <DeniedState appName='Vulnerability' />}
                        </Suspense>
                    </div>
                    <div className="dashboard-card-compliance-remediations">
                        <Suspense fallback={ <Loading /> }>
                            {permission.compliance ? <ComplianceCard /> : <DeniedState appName='Compliance' />}
                        </Suspense>
                        <Divider />
                        <Suspense fallback={ <Loading /> }>
                            {permission.remediations ? <RemediationsCard /> : <DeniedState appName='Remediations' />}
                        </Suspense>
                    </div>
                </Main>
            </React.Fragment>
            : <NoSystems workloadIs='SAP' />
        : <NoSystems />;
};

Dashboard.propTypes = {
    workloads: workloadsPropType
};

export default connect(({ DashboardStore }) => ({ workloads: DashboardStore.workloads }), null)(Dashboard);

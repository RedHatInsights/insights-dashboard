import './_dashboard.scss';

import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';

import API from '../../Utilities/Api';
import Loading from '../../PresentationalComponents/Loading/Loading';
import NoSystems from '../NoSystems/NoSystems';
import { PermissionContext } from '../../App';
import { SAP_FETCH_URL } from '../../AppConstants';
import ZeroState from '../ZeroState/ZeroState';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { workloadsPropType } from '../../Utilities/Common';

const AdvisorCard = lazy(() => import('../../SmartComponents/Advisor/Advisor'));
const ComplianceCard = lazy(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = lazy(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));
const SystemInventoryHeader = lazy(() => import('../../SmartComponents/SystemInventory/SystemInventoryHeader'));
const NewRules = lazy(() => import('../../SmartComponents/NewRules/NewRules'));
const SubscriptionsUtilizedCard = lazy(() => import('../../SmartComponents/SubscriptionsUtilized/SubscriptionsUtilizedCard'));
const PatchManagerCard = lazy(() => import('../../SmartComponents/PatchManager/PatchManagerCard'));
const RemediationsCard = lazy(() => import('../../SmartComponents/Remediations/RemediationsCard'));
const PoliciesCard = lazy(() => import('../../SmartComponents/Policies/PoliciesCard'));
const Footer = lazy(() => import('../../SmartComponents/Footer/Footer'));

// components
import {
    PageSection,
    PageSectionVariants,
    Title
} from '@patternfly/react-core/dist/esm/components';

// layouts
import {
    Grid,
    GridItem
} from '@patternfly/react-core/dist/esm/layouts';

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
                <PageSection isWidthLimited variant={ PageSectionVariants.light }>
                    <Title headingLevel="h1" size="2xl" className="pf-u-screen-reader">
                        {intl.formatMessage(messages.dashboardTitle)}
                    </Title>
                    <Suspense fallback={ <Loading /> }>
                        <SystemInventoryHeader />
                    </Suspense>
                </PageSection>
                <PageSection isFilled={true} isWidthLimited>
                    <Grid hasGutter>
                        <Suspense fallback={ <Loading /> }>
                            <GridItem>
                                {permission.vulnerability &&
                                    <NewRules />
                                }
                            </GridItem>
                        </Suspense>
                        <Grid hasGutter>
                            <Suspense fallback={ <Loading /> }>
                                {permission.vulnerability &&
                                    <GridItem md={ 6 }>
                                        <Grid className="pf-m-full-height">
                                            <VulnerabilityCard />
                                        </Grid>
                                    </GridItem>
                                }
                            </Suspense>
                            <Suspense fallback={ <Loading /> }>
                                {permission.advisor &&
                                    <GridItem md={ 6 }>
                                        <Grid className="pf-m-full-height">
                                            <AdvisorCard />
                                        </Grid>
                                    </GridItem>
                                }
                            </Suspense>
                            <div className="ins-l-columns">
                                <PoliciesCard />
                                <Suspense fallback={ <Loading /> }>
                                    {permission.policies &&
                                        <PoliciesCard />
                                    }
                                </Suspense>
                                <Suspense fallback={ <Loading /> }>
                                    {permission.remediations &&
                                        <RemediationsCard />
                                    }
                                </Suspense>
                                <Suspense fallback={ <Loading /> }>
                                    {permission.patch &&
                                        <PatchManagerCard />
                                    }
                                </Suspense>
                                <Suspense fallback={ <Loading /> }>
                                    {permission.compliance &&
                                        <ComplianceCard />
                                    }
                                </Suspense>
                                <Suspense fallback={ <Loading /> }>
                                    {permission.subscriptions &&
                                        <SubscriptionsUtilizedCard />
                                    }
                                </Suspense>
                            </div>
                        </Grid>
                    </Grid>
                </PageSection>
                <Footer />
            </React.Fragment>
            : <NoSystems workloadIs='SAP' />
        : <ZeroState />;
};

Dashboard.propTypes = {
    workloads: workloadsPropType
};

export default connect(({ DashboardStore }) => ({ workloads: DashboardStore.workloads }), null)(Dashboard);

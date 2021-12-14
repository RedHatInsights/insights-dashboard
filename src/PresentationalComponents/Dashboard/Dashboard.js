import './dashboard.scss';

import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts';
import { PageSection, PageSectionVariants, Title } from '@patternfly/react-core/dist/esm/components';
import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

import API from '../../Utilities/Api';
import Loading from '../../PresentationalComponents/Loading/Loading';
import Masonry from 'react-masonry-css';
import NoSystems from '../NoSystems/NoSystems';
import { PermissionContext } from '../../App';
import { SAP_FETCH_URL } from '../../AppConstants';
import ZeroState from '../ZeroState/ZeroState';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { workloadsPropType } from '../../Utilities/Common';
import ResourceOptimizationCard from '../../SmartComponents/ResourceOptimization/ResourceOptimizationCard';

const AdvisorCard = lazy(() => import('../../SmartComponents/Advisor/Advisor'));
const ComplianceCard = lazy(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = lazy(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));
const SystemInventoryHeader = lazy(() => import('../../SmartComponents/SystemInventory/SystemInventoryHeader'));
const NewRules = lazy(() => import('../../SmartComponents/NewRules/NewRules'));
const SubscriptionsUtilizedCard = lazy(() => import('../../SmartComponents/SubscriptionsUtilized/SubscriptionsUtilizedCard'));
const PatchManagerCard = lazy(() => import('../../SmartComponents/PatchManager/PatchManagerCard'));
const RemediationsCard = lazy(() => import('../../SmartComponents/Remediations/RemediationsCard'));
const Footer = lazy(() => import('../../SmartComponents/Footer/Footer'));

const Dashboard = ({ workloads }) => {
    const permission = useContext(PermissionContext);
    const intl = useIntl();
    const [supportsSap, setSupportsSap] = useState(true);
    const newRules = useSelector(({ DashboardStore }) => DashboardStore.vulnerabilities.recent_rules);
    const { isFedramp } = useChrome();

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

    const breakpointColumnsObj = {
        default: 2,
        992: 1
    };

    return permission.hasSystems ?
        (!workloads?.SAP?.isSelected) || (workloads?.SAP?.isSelected && supportsSap) ?
            <React.Fragment>
                <PageSection isWidthLimited variant={ PageSectionVariants.light } className="insd-c-dashboard-header">
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
                            {newRules?.length > 0 && permission.vulnerability && <GridItem>
                                <NewRules />
                            </GridItem> }
                        </Suspense>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="ins-l-masonry"
                            columnClassName="ins-l-masonry_column"
                        >
                            <Suspense fallback={ <Loading /> }>
                                {permission.vulnerability &&
                                    <VulnerabilityCard />
                                }
                            </Suspense>
                            <Suspense fallback={ <Loading /> }>
                                {permission.advisor &&
                                    <AdvisorCard />
                                }
                            </Suspense>
                            <Suspense fallback={ <Loading /> }>
                                {permission.compliance &&
                                    <ComplianceCard />
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
                                {permission.ros &&
                                    <ResourceOptimizationCard/>
                                }
                            </Suspense>
                            {!isFedramp && (
                                <Suspense fallback={ <Loading /> }>
                                    {permission.subscriptions &&
                                    <SubscriptionsUtilizedCard />
                                    }
                                </Suspense>
                            )}
                        </Masonry>
                    </Grid>
                </PageSection>
                <Footer supportsSap={(!workloads?.SAP?.isSelected) || (workloads?.SAP?.isSelected && supportsSap)}/>
            </React.Fragment>
            : <NoSystems workloadIs='SAP' />
        : <ZeroState />;
};

Dashboard.propTypes = {
    workloads: workloadsPropType
};

export default connect(({ DashboardStore }) => ({ workloads: DashboardStore.workloads }), null)(Dashboard);

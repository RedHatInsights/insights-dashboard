import './dashboard.scss';

import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts';
import { PageSection, PageSectionVariants, Title } from '@patternfly/react-core/dist/esm/components';
import React, { Suspense, lazy, useContext, useEffect } from 'react';

import Loading from '../../PresentationalComponents/Loading/Loading';
import Masonry from 'react-masonry-css';
import { PermissionContext } from '../../App';
import ZeroState from '../ZeroState/ZeroState';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { workloadsPropType } from '../../Utilities/Common';
import ResourceOptimizationCard from '../../SmartComponents/ResourceOptimization/ResourceOptimizationCard';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const AdvisorCard = lazy(() => import('../../SmartComponents/Advisor/Advisor'));
const ComplianceCard = lazy(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = lazy(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));
const SystemInventoryHeader = lazy(() => import('../../SmartComponents/SystemInventory/SystemInventoryHeader'));
const NewRules = lazy(() => import('../../SmartComponents/NewRules/NewRules'));
const PatchManagerCard = lazy(() => import('../../SmartComponents/PatchManager/PatchManagerCard'));
const RemediationsCard = lazy(() => import('../../SmartComponents/Remediations/RemediationsCard'));
const Footer = lazy(() => import('../../SmartComponents/Footer/Footer'));
const DriftCard = lazy(() => import('../../SmartComponents/Drift/DriftCard'));

//We will be using this later. commenting out for now.
const Dashboard = (/*{ workloads }*/) => {
    const permission = useContext(PermissionContext);
    const intl = useIntl();
    const newRules = useSelector(({ DashboardStore }) => DashboardStore.vulnerabilities.recent_rules);
    const chrome = useChrome();
    const breakpointColumnsObj = {
        default: 2,
        992: 1
    };
    useEffect(()=>{
        chrome.updateDocumentTitle(`Dashboard | Red Hat Insights`);
    }, [chrome]);

    return permission.hasSystems  ?
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
                        <Suspense>
                            {permission.drift && permission.notifications
                            && <DriftCard/>}
                        </Suspense>
                    </Masonry>
                </Grid>
            </PageSection>
            <Footer supportsSap={ true }/>
        </React.Fragment>
        :
        <ZeroState/>;

};

Dashboard.propTypes = {
    workloads: workloadsPropType
};

export default connect(({ DashboardStore }) => ({ workloads: DashboardStore.workloads }), null)(Dashboard);

import React, { useContext, useEffect } from 'react';
import { Grid, GridItem } from '@patternfly/react-core';
import { PageSection, PageSectionVariants, Title } from '@patternfly/react-core';
import Masonry from 'react-masonry-css';
import { PermissionContext } from '../PermissionsProvider/PermissionsProvider';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { workloadsPropType } from '../../Utilities/Common';
import ResourceOptimizationCard from '../../SmartComponents/ResourceOptimization/ResourceOptimizationCard';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { CentOsCard } from '../../SmartComponents/CentOs';
import AdvisorCard from '../../SmartComponents/Advisor/Advisor';
import ComplianceCard from '../../SmartComponents/Compliance/ComplianceCard';
import VulnerabilityCard from '../../SmartComponents/Vulnerability/VulnerabilityCard';
import SystemInventoryHeader from '../../SmartComponents/SystemInventory/SystemInventoryHeader';
import NewRules from '../../SmartComponents/NewRules/NewRules';
import PatchManagerCard from '../../SmartComponents/PatchManager/PatchManagerCard';
import RemediationsCard from '../../SmartComponents/Remediations/RemediationsCard';
import Footer from '../../SmartComponents/Footer/Footer';
import DriftCard from '../../SmartComponents/Drift/DriftCard';
import './dashboard.scss';
import { useFeatureFlag } from '../../Utilities/Hooks';

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
        chrome.updateDocumentTitle(`Dashboard | RHEL`);
    }, [chrome]);
    const isDriftSunset = useFeatureFlag('insights.drift.isSunset');

    return (<React.Fragment>
        <PageSection isWidthLimited variant={ PageSectionVariants.light } className="insd-c-dashboard-header">
            <Title headingLevel="h1" size="2xl" className="pf-v5-u-screen-reader">
                {intl.formatMessage(messages.dashboardTitle)}
            </Title>
            <SystemInventoryHeader/>
        </PageSection>
        <PageSection isFilled={true} isWidthLimited>
            <Grid hasGutter>
                {newRules?.length > 0 && permission.vulnerability && <GridItem>
                    <NewRules />
                </GridItem> }

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="ins-l-masonry"
                    columnClassName="ins-l-masonry_column"
                >
                    {permission.vulnerability &&
                        <VulnerabilityCard />
                    }

                    {permission.advisor &&
                        <AdvisorCard />
                    }

                    {permission.compliance &&
                        <ComplianceCard />
                    }

                    <CentOsCard />

                    {permission.remediations &&
                        <RemediationsCard />
                    }

                    {permission.patch &&
                        <PatchManagerCard />
                    }

                    {permission.ros &&
                        <ResourceOptimizationCard/>
                    }

                    {permission.drift && permission.notifications && !isDriftSunset
                        && <DriftCard/>}

                </Masonry>
            </Grid>
        </PageSection>
        <Footer supportsSap={ true }/>
    </React.Fragment>);

};

Dashboard.propTypes = {
    workloads: workloadsPropType
};

export default connect(({ DashboardStore }) => ({ workloads: DashboardStore.workloads }), null)(Dashboard);

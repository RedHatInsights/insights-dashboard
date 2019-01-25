import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, GridItem } from '@patternfly/react-core';
import { PageHeader, PageHeaderTitle, Main } from '@red-hat-insights/insights-frontend-components';

import asyncComponent from '../../Utilities/skeletonAsyncCard';
import './_dashboard.scss';

const ComplianceCard = asyncComponent(() => import ('../../SmartComponents/Cards/ComplianceCard'));
const ConfigAssessmentCard = asyncComponent(() => import ('../../SmartComponents/Cards/ConfigAssessmentCard'));
const CostManagementCard = asyncComponent(() => import ('../../SmartComponents/Cards/CostManagementCard'));
const VulnerabilitiesCard = asyncComponent(() => import ('../../SmartComponents/Cards/VulnerabilitiesCard'));

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
                <PageHeader>
                    <PageHeaderTitle title='Health of Your Infrastructure'/>
                </PageHeader>
                <Main className='ins-l-dashboard'>
                    <Grid gutter='md'>
                        <GridItem lg={4} md={6} sm={12}>
                            <ConfigAssessmentCard />
                        </GridItem>
                        <GridItem lg={4} md={6} sm={12}>
                            <VulnerabilitiesCard />
                        </GridItem>
                        <GridItem lg={4} md={6} sm={12}>
                            <ComplianceCard />
                        </GridItem>
                        <GridItem lg={4} md={6} sm={12}>
                            <CostManagementCard />
                        </GridItem>
                    </Grid>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(Dashboard);

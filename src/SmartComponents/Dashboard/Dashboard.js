import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, GridItem } from '@patternfly/react-core';
import { Dark, PageHeader, PageHeaderTitle, Main } from '@red-hat-insights/insights-frontend-components';

import asyncComponent from '../../Utilities/asyncComponent';
import './_dashboard.scss';

const ComplianceCard = asyncComponent(() => import ('../Cards/ComplianceCard'));
const ConfigAssessmentCard = asyncComponent(() => import ('../Cards/ConfigAssessmentCard'));
const CostManagementCard = asyncComponent(() => import ('../Cards/CostManagementCard'));
const VulnerabilitiesCard = asyncComponent(() => import ('../Cards/VulnerabilitiesCard'));

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
            <Dark>
                <PageHeader>
                    <PageHeaderTitle title='Health of Your Infrastructure'/>
                </PageHeader>
                <Main className='ins-l-dashboard'>
                    <Grid gutter='md'>
                        <GridItem span={4}>
                            <ConfigAssessmentCard />
                        </GridItem>
                        <GridItem span={4}>
                            <VulnerabilitiesCard />
                        </GridItem>
                        <GridItem span={4}>
                            <ComplianceCard />
                        </GridItem>
                        <GridItem span={4}>
                            <CostManagementCard />
                        </GridItem>
                    </Grid>
                </Main>
            </Dark>
        );
    }
}

export default withRouter(Dashboard);

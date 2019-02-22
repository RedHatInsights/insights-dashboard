import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Gallery, GalleryItem } from '@patternfly/react-core';
import { PageHeader, PageHeaderTitle, Main } from '@red-hat-insights/insights-frontend-components';

import asyncComponent from '../../Utilities/skeletonAsyncCard';
import './_dashboard.scss';

const ComplianceCard = asyncComponent(() => import ('../../SmartComponents/Cards/ComplianceCard'));
const InsightsCard = asyncComponent(() => import ('../../SmartComponents/Cards/InsightsCard'));
const CostManagementCard = asyncComponent(() => import ('../../SmartComponents/Cards/CostManagementCard'));
const VulnerabilityCard = asyncComponent(() => import ('../../SmartComponents/Cards/VulnerabilityCard'));

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
                    <Gallery gutter='md'>
                        <GalleryItem>
                            <InsightsCard />
                        </GalleryItem>
                        <GalleryItem>
                            <VulnerabilityCard />
                        </GalleryItem>
                        <GalleryItem>
                            <ComplianceCard />
                        </GalleryItem>
                        <GalleryItem>
                            <CostManagementCard />
                        </GalleryItem>
                    </Gallery>
                </Main>
            </React.Fragment>
        );
    }
}

export default withRouter(Dashboard);

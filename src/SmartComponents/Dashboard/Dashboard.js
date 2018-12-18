import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Gallery, GalleryItem } from '@patternfly/react-core';
import { Dark, PageHeader, PageHeaderTitle, Main } from '@red-hat-insights/insights-frontend-components';

import asyncComponent from '../../Utilities/asyncComponent';
import './_dashboard.scss';

const ComplianceCard = asyncComponent(() => import ('../Cards/ComplianceCard'));
// const ConfigAssessmentsCard = asyncComponent(() => import ('../Cards/ConfigAssessmentsCard'));
// const CostManagementCard = asyncComponent(() => import ('../Cards/CostManagementCard'));
// const VulnerabilitiesCard = asyncComponent(() => import ('../Cards/VulnerabilitiesCard'));

// makes eslint exception for webpack variable RELEASE
// global RELEASE:true
// /*eslint no-undef: "error"*/
// const release = RELEASE;

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
                    <Gallery gutter='md'>
                        <GalleryItem>
                            <ComplianceCard />
                        </GalleryItem>
                        <GalleryItem>
                            <ComplianceCard />
                        </GalleryItem>
                        <GalleryItem>
                            <ComplianceCard />
                        </GalleryItem>
                        <GalleryItem>
                            <ComplianceCard />
                        </GalleryItem>
                    </Gallery>
                </Main>
            </Dark>
        );
    }
}

export default withRouter(Dashboard);

/* eslint-disable no-console */
import './_dashboard.scss';

import { Gallery, GalleryItem } from '@patternfly/react-core/dist/js/layouts/Gallery/index';
import { PageHeader, PageHeaderTitle } from '@red-hat-insights/insights-frontend-components/components/PageHeader';

import { Main } from '@red-hat-insights/insights-frontend-components/components/Main';
import PropTypes from 'prop-types';
import React from 'react';
import asyncComponent from '../../Utilities/skeletonAsyncCard';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';

const ComplianceCard = asyncComponent(() => import('../../SmartComponents/Compliance/ComplianceCard'));
const VulnerabilityCard = asyncComponent(() => import('../../SmartComponents/Vulnerability/VulnerabilityCard'));

const Dashboard = ({ intl }) =>
    <React.Fragment>
        <PageHeader>
            <PageHeaderTitle title={ intl.formatMessage(messages.dashboardTitle) } />
        </PageHeader>
        <Main className='ins-l-dashboard'>
            <Gallery gutter='md'>
                <GalleryItem>
                    <VulnerabilityCard />
                </GalleryItem>
                <GalleryItem>
                    <ComplianceCard />
                </GalleryItem>
            </Gallery>
        </Main>
    </React.Fragment>;

Dashboard.propTypes = { intl: PropTypes.any };

export default injectIntl(Dashboard);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';
import { ExclamationCircleIcon, FlagIcon } from '@patternfly/react-icons';

import {
    Card, CardBody, CardFooter, CardHeader,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';
import Loading from '../../PresentationalComponents/Loading/Loading';

import './_cards.scss';

// expose RELEASE
/*global RELEASE:true*/
const release = RELEASE;

/**
 * Vulnerabilities Card for showing number of critical vulnerabilities
 */
class VulnerabilitiesCard extends Component {

    constructor(props) {
        super(props);
        this.props = {};
    }

    componentDidMount () {
        this.props.fetchCriticalVulnerabilities();
        this.props.fetchLatestVulnerabilities();
    }

    render() {
        const {
            criticalVulnerabilitiesFetchStatus,
            latestVulnerabilitiesFetchStatus,
            criticalVulnerabilities,
            latestVulnerabilities
        } = this.props;

        return (
            <Card className='ins-c-card__vulnerabilities'>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Vulnerabilities</Title>
                </CardHeader>
                <CardBody>
                    { criticalVulnerabilitiesFetchStatus === 'fulfilled' && (
                        <div className='ins-c-summary'>
                            <ExclamationCircleIcon className='ins-c-summary__icon ins-c-summary__icon-critical' />
                            <span className='ins-c-summary__emphasis'>{ criticalVulnerabilities.meta.total_items }</span>
                            <span className='ins-c-summary__label'>
                                <a href={ `/${release}/platform/vulnerability/` }>Critical</a>
                            </span>
                        </div>
                    ) } { criticalVulnerabilitiesFetchStatus === 'pending' && (<Loading />) }
                    { latestVulnerabilitiesFetchStatus === 'fulfilled' && (
                        <div className='ins-c-summary'>
                            <FlagIcon className='ins-c-summary__icon ins-c-summary__icon-flag' />
                            <span className='ins-c-summary__emphasis'>{ latestVulnerabilities.meta.total_items }</span>
                            <span className='ins-c-summary__label'>CVEs added in the last 7 days</span>
                        </div>
                    ) }
                </CardBody>
                <CardFooter>
                    <a href={ `/${release}/platform/vulnerability/` }>View All Vulnerabilities</a>
                </CardFooter>
            </Card>
        );
    }
}

VulnerabilitiesCard.propTypes = {
    fetchCriticalVulnerabilities: PropTypes.func,
    criticalVulnerabilities: PropTypes.object,
    criticalVulnerabilitiesFetchStatus: PropTypes.string,
    fetchLatestVulnerabilities: PropTypes.func,
    latestVulnerabilities: PropTypes.object,
    latestVulnerabilitiesFetchStatus: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    criticalVulnerabilities: state.DashboardStore.criticalVulnerabilities,
    criticalVulnerabilitiesFetchStatus: state.DashboardStore.criticalVulnerabilitiesFetchStatus,
    latestVulnerabilities: state.DashboardStore.latestVulnerabilities,
    latestVulnerabilitiesFetchStatus: state.DashboardStore.latestVulnerabilitiesFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchCriticalVulnerabilities: (url) => dispatch(AppActions.fetchCriticalVulnerabilities(url)),
    fetchLatestVulnerabilities: (url) => dispatch(AppActions.fetchLatestVulnerabilities(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(VulnerabilitiesCard));

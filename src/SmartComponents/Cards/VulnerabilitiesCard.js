import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    Card, CardBody, CardFooter, CardHeader,
    Grid, GridItem,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';
import Loading from '../../PresentationalComponents/Loading/Loading';

import './_cards.scss';

/**
 * Vulnerabilities Card
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

        if (criticalVulnerabilitiesFetchStatus === 'fulfilled') {
            // eslint-disable-next-line no-console
            console.log(criticalVulnerabilities);
        }

        return (
            <Card>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Vulnerabilities</Title>
                </CardHeader>
                <CardBody>
                    <Grid gutter='md' span={6} rowSpan={2}>
                        { criticalVulnerabilitiesFetchStatus === 'fulfilled' && (
                            <React.Fragment>
                                <GridItem><p>icon</p></GridItem>
                                <GridItem>{ criticalVulnerabilities.meta.total_items }</GridItem>
                                <GridItem>Critical</GridItem>
                            </React.Fragment>
                        ) } { criticalVulnerabilitiesFetchStatus === 'pending' && (<Loading />) }
                    </Grid>
                    <Grid gutter='md' span={6} rowSpan={2}>
                        { latestVulnerabilitiesFetchStatus === 'fulfilled' && (
                            <React.Fragment>
                                <GridItem><p>icon</p></GridItem>
                                <GridItem>{ latestVulnerabilities.meta.total_items }</GridItem>
                                <GridItem>CVEs added in the last 7 days</GridItem>
                            </React.Fragment>
                        ) } { latestVulnerabilitiesFetchStatus === 'pending' && (<Loading />) }
                    </Grid>
                </CardBody>
                <CardFooter>View All Vulnerabilities</CardFooter>
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

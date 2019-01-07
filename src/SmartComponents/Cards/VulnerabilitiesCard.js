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
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchCriticalVulnerabilities();
        this.props.fetchLatestVulnerabilities();
    }

    componentDidUpdate (prevProps) {
        if (this.props.criticalVulnerabilities !== prevProps.criticalVulnerabilities) {
            const vulnProps = this.props.criticalVulnerabilities;
            this.setState({ total: vulnProps.meta.total_items });
        }

        if (this.props.latestVulnerabilities !== prevProps.latestVulnerabilities) {
            const latestProps = this.props.latestVulnerabilities;
            this.setState({ latestCount: latestProps.meta.total_items });
        }
    }

    render() {
        const {
            criticalVulnerabilitiesFetchStatus,
            latestVulnerabilitiesFetchStatus
        } = this.props;

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
                                <GridItem>{ this.state.total }</GridItem>
                                <GridItem>Critical</GridItem>
                            </React.Fragment>
                        ) } { criticalVulnerabilitiesFetchStatus === 'pending' && (<Loading />) }
                    </Grid>
                    <Grid gutter='md' span={6} rowSpan={2}>
                        { latestVulnerabilitiesFetchStatus === 'fulfilled' && (
                            <React.Fragment>
                                <GridItem><p>icon</p></GridItem>
                                <GridItem>{ this.state.latestCount }</GridItem>
                                <GridItem>CVEs added in the last 7 days</GridItem>
                            </React.Fragment>
                        ) } { latestVulnerabilitiesFetchStatus === 'pending' && (<Loading />) }
                    </Grid>
                </CardBody>
                <CardFooter>View All 56 Vulnerabilities</CardFooter>
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

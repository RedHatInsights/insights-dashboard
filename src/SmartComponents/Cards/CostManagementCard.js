import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    Card, CardBody, CardFooter, CardHeader,
    Grid, GridItem,
    Stack, StackItem,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';
import Loading from '../../PresentationalComponents/Loading/Loading';

import './_cards.scss';

/**
 * Cost Management Summary
 */
class CostManagementCard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchOcpSummary();
        this.props.fetchAwsSummary();
    }

    render() {
        const {
            ocpSummaryFetchStatus,
            awsSummaryFetchStatus,
            ocpSummary,
            awsSummary
        } = this.props;

        let ocpStats = {};
        let awsStats = {};

        if (ocpSummaryFetchStatus === 'fulfilled') {
            ocpStats.delta = Math.round(ocpSummary.delta.percent);
            ocpStats.total = Math.round(ocpSummary.total.charge * 100) / 100;
            // ocpStats.totalUnits = ocpSummary.total.units;
            ocpStats.date = moment(ocpSummary.data.date).format('MMMM Do YYYY');
            ocpStats.filter = (-1 * ocpSummary.filter.time_scope_value) + ' ' + ocpSummary.filter.time_scope_units;
        }

        if (awsSummaryFetchStatus === 'fulfilled') {
            awsStats.delta = Math.round(awsSummary.delta.percent);
            awsStats.total = Math.round(awsSummary.total.charge * 100) / 100;
            // awsStats.totalUnits = awsSummary.total.units;
            awsStats.date = moment(awsSummary.data.date).format('MMMM Do YYYY');
            awsStats.filter = (-1 * awsSummary.filter.time_scope_value) + ' ' + awsSummary.filter.time_scope_units;
        }

        return (
            <Card>
                <CardHeader>
                    <Title className='pf-u-mt-0 pf-u-mb-0' size={'lg'}>Cost Management</Title>
                </CardHeader>
                <CardBody>
                    { ocpSummaryFetchStatus === 'fulfilled' && (
                        <Grid gutter='md' span={6}>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'>OpenShift Total Charges</StackItem>
                                    <StackItem>${ ocpStats.total }</StackItem>
                                    <StackItem>{ ocpStats.date }</StackItem>
                                </Stack>
                            </GridItem>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'> </StackItem>
                                    <StackItem>{ ocpStats.delta }</StackItem>
                                    <StackItem>Compared to { ocpStats.filter } ago</StackItem>
                                </Stack>
                            </GridItem>
                        </Grid>
                    ) } { ocpSummaryFetchStatus === 'pending' && (<Loading/>) }
                    { awsSummaryFetchStatus === 'fulfilled' && (
                        <Grid gutter='md' span={6}>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'>AWS Total Cost</StackItem>
                                    <StackItem>${ awsStats.delta }</StackItem>
                                    <StackItem>{ awsStats.date }</StackItem>
                                </Stack>
                            </GridItem>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'> </StackItem>
                                    <StackItem>{ awsStats.delta }</StackItem>
                                    <StackItem>Compared to { awsStats.filter } ago</StackItem>
                                </Stack>
                            </GridItem>
                        </Grid>
                    ) } { awsSummaryFetchStatus === 'pending' && (<Loading/>) }
                </CardBody>
                <CardFooter>View All Cost/Charges</CardFooter>
            </Card>
        );
    }
}

CostManagementCard.propTypes = {
    fetchOcpSummary: PropTypes.func,
    ocpSummary: PropTypes.object,
    ocpSummaryFetchStatus: PropTypes.string,
    fetchAwsSummary: PropTypes.func,
    awsSummary: PropTypes.object,
    awsSummaryFetchStatus: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    awsSummary: state.DashboardStore.awsSummary,
    awsSummaryFetchStatus: state.DashboardStore.awsSummaryFetchStatus,
    ocpSummary: state.DashboardStore.ocpSummary,
    ocpSummaryFetchStatus: state.DashboardStore.ocpSummaryFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchAwsSummary: (url) => dispatch(AppActions.fetchAwsSummary(url)),
    fetchOcpSummary: (url) => dispatch(AppActions.fetchOcpSummary(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(CostManagementCard));

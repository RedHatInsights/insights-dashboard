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
        this.state = {
            ocpDelta: 0,
            ocpTotal: 0,
            ocpTotalUnits: '',
            ocpDate: '',
            ocpFilter: '',
            awsDelta: 0,
            awsTotal: 0,
            awsTotalUnits: '',
            awsDate: '',
            awsFilter: ''
        };
    }

    componentDidMount() {
        this.props.fetchOcpSummary();
        this.props.fetchAwsSummary();
    }

    componentDidUpdate (prevProps) {
        if (this.props.ocpSummary !== prevProps.ocpSummary) {
            const ocpProps = this.props.ocpSummary;
            this.setState({ ocpDelta: Math.round(ocpProps.delta.percent) });
            this.setState({ ocpTotal: Math.round(ocpProps.total.value * 100) / 100 });
            this.setState({ ocpTotalUnits: ocpProps.total.units });
            this.setState({ ocpDate: ocpProps.data.date });
            this.setState({ ocpFilter: (-1 * ocpProps.time_scope_value) + ' ' + ocpProps.time_scope_units });
        }

        if (this.props.awsSummary !== prevProps.awsSummary) {
            const awsProps = this.props.awsSummary;
            this.setState({ delta: Math.round(awsProps.delta.percent) });
            this.setState({ total: Math.round(awsProps.total.value * 100) / 100 });
            this.setState({ totalUnits: awsProps.total.units });
            this.setState({ date: awsProps.data.date });
            this.setState({ filter: (-1 * awsProps.time_scope_value) + ' ' + awsProps.time_scope_units });
        }
    }

    render() {
        const {
            ocpSummaryFetchStatus,
            awsSummaryFetchStatus
        } = this.props;

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
                                    <StackItem>${ this.state.ocpTotal }</StackItem>
                                    <StackItem>{ moment(this.state.ocpDate).format('LL') }</StackItem>
                                </Stack>
                            </GridItem>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'> </StackItem>
                                    <StackItem>{ this.state.ocpDelta }</StackItem>
                                    <StackItem>Compared to { this.state.ocpFilter } ago</StackItem>
                                </Stack>
                            </GridItem>
                        </Grid>
                    ) } { ocpSummaryFetchStatus === 'pending' && (<Loading/>) }
                    { awsSummaryFetchStatus === 'fulfilled' && (
                        <Grid gutter='md' span={6}>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'>AWS Total Cost</StackItem>
                                    <StackItem>${ this.state.awsDelta }</StackItem>
                                    <StackItem>{ moment(this.state.awsDate).format('LL') }</StackItem>
                                </Stack>
                            </GridItem>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'> </StackItem>
                                    <StackItem>{ this.state.awsDelta }</StackItem>
                                    <StackItem>Compared to { this.state.awsFilter } ago</StackItem>
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

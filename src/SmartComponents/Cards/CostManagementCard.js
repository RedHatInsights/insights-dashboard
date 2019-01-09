import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';
import { CaretUpIcon, CaretDownIcon } from '@patternfly/react-icons';

import {
    Card, CardBody, CardFooter, CardHeader,
    // Grid, GridItem,
    Split, SplitItem,
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
            ocpStats.delta = Math.abs(Math.round(ocpSummary.delta.percent));
            ocpStats.deltaColor = ocpSummary.delta.percent > 0 ? 'green' :
                ocpSummary.delta.percent < 0 ? 'red' : 'black';
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

        function getCaret (deltaColor) {
            switch (deltaColor) {
                case 'green':
                    return <CaretUpIcon />;
                case 'red':
                    return <CaretDownIcon />;
                default:
                    return;
            }
        }

        return (
            <Card className='ins-c-card__cost-management'>
                <CardHeader>
                    <Title className='pf-u-mt-0 pf-u-mb-0' size={'lg'}>Cost Management</Title>
                </CardHeader>
                <CardBody>
                    { ocpSummaryFetchStatus === 'fulfilled' && (
                        <Stack span={6} className='ins-c-summary'>
                            <StackItem>OpenShift Total Charges</StackItem>
                            <StackItem>
                                <Split gutter='sm'>
                                    <SplitItem>
                                        <Stack>
                                            <StackItem className='ins-c-summary__emphasis'>${ ocpStats.total }</StackItem>
                                            <StackItem className='ins-c-summary__accent'>{ ocpStats.date }</StackItem>
                                        </Stack>
                                    </SplitItem>
                                    <SplitItem>
                                        <Stack>
                                            <StackItem className= {`ins-c-summary__emphasis ins-m-${ocpStats.deltaColor}` }>
                                                { ocpStats.delta }%
                                                { getCaret(ocpStats.deltaColor) }
                                            </StackItem>
                                            <StackItem className='ins-c-summary__accent'>Compared to { ocpStats.filter } ago</StackItem>
                                        </Stack>
                                    </SplitItem>
                                </Split>
                            </StackItem>
                        </Stack>
                    ) } { ocpSummaryFetchStatus === 'pending' && (<Loading/>) }
                    {/* { awsSummaryFetchStatus === 'fulfilled' && (
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
                    ) } { awsSummaryFetchStatus === 'pending' && (<Loading/>) } */}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';
import { CaretUpIcon, CaretDownIcon, DollarSignIcon } from '@patternfly/react-icons';

import {
    Card, CardBody, CardFooter, CardHeader,
    // Grid, GridItem,
    Level, LevelItem,
    Stack, StackItem,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';
import Loading from '../../PresentationalComponents/Loading/Loading';

import './_cards.scss';

// expose RELEASE
/*global RELEASE:true*/
const release = RELEASE;

/**
 * Cost Management Summary card for showing costs and monthly delta for AWS
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
            if (ocpSummary.total > 0) {
                ocpStats.title = 'OpenShift Total Charges';
                ocpStats.delta = Math.abs(Math.round(ocpSummary.delta.percent));
                ocpStats.deltaColor = ocpSummary.delta.percent > 0 ? 'green' :
                    ocpSummary.delta.percent < 0 ? 'red' : 'black';
                ocpStats.total = Math.round(ocpSummary.total.charge * 100) / 100;
                // ocpStats.totalUnits = ocpSummary.total.units;
                ocpStats.date = moment(ocpSummary.data.date).format('MMMM Do YYYY');
                ocpStats.filter = (-1 * ocpSummary.filter.time_scope_value) + ' ' + ocpSummary.filter.time_scope_units;
            }
        }

        if (awsSummaryFetchStatus === 'fulfilled') {
            if (awsSummary.total.value > 0) {
                awsStats.title = 'Cloud (AWS) Cost';
                awsStats.delta = Math.round(awsSummary.delta.percent);
                awsStats.total = Math.round(awsSummary.total.value * 100) / 100;
                awsStats.deltaColor = awsSummary.delta.percent > 0 ? 'green' :
                    awsSummary.delta.percent < 0 ? 'red' : 'black';
                // awsStats.totalUnits = awsSummary.total.units;
                awsStats.date = moment(awsSummary.data.date).format('MMMM Do YYYY');
                awsStats.filter = (-1 * awsSummary.filter.time_scope_value) + ' ' + awsSummary.filter.time_scope_units;
            }
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

        function getCostStack (costSummary) {
            return (
                <Stack span={6} className='ins-c-summary'>
                    <StackItem className='ins-c-summary__title'>{ costSummary.title }</StackItem>
                    <StackItem>
                        <Level gutter='sm'>
                            <LevelItem>
                                <Stack>
                                    <StackItem className='ins-c-summary__emphasis'>${ costSummary.total }</StackItem>
                                    <StackItem className='ins-c-summary__accent'>{ costSummary.date }</StackItem>
                                </Stack>
                            </LevelItem>
                            <LevelItem>
                                <Stack>
                                    <StackItem className= {`ins-c-summary__emphasis ins-m-${costSummary.deltaColor}` }>
                                        { costSummary.delta }%
                                        { getCaret(costSummary.deltaColor) }
                                    </StackItem>
                                    <StackItem className='ins-c-summary__accent'>Compared to { costSummary.filter } ago</StackItem>
                                </Stack>
                            </LevelItem>
                        </Level>
                    </StackItem>
                </Stack>
            );
        }

        return (
            <Card className='ins-c-card__cost-management'>
                <CardHeader>
                    <Title className='pf-u-mt-0 pf-u-mb-0' size={'lg'}>Cost Management</Title>
                </CardHeader>
                <CardBody>
                    { ocpSummaryFetchStatus === 'fulfilled' && ocpStats.total > 0 && (
                        getCostStack(ocpStats)
                    ) } { awsSummaryFetchStatus === 'fulfilled' && awsStats.total > 0 && (
                        getCostStack(awsStats)
                    ) } { ocpSummaryFetchStatus === 'pending' && (<Loading/>) }
                    { ocpSummaryFetchStatus === 'fulfilled' && awsSummaryFetchStatus === 'fulfilled' && !ocpStats.total
                        && !awsStats.total && (
                        <center className='ins-c-summary'>
                            <DollarSignIcon className='ins-c-summary__icon' size='lg' />
                            <div className='ins-c-summary__label'>No Money, No Problems!</div>
                        </center>
                    )}
                </CardBody>
                <CardFooter><a href={ `/${release}/platform/cost-management/` }>View All Cost/Charges</a></CardFooter>
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

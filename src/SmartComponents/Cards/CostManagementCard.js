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
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchOcpSummary(); // eslint-disable-line camelcase
    }

    componentDidUpdate (prevProps) {
        if (this.props.ocpSummary !== prevProps.ocpSummary) {
            const ocpProps = this.props.ocpSummary;
            this.setState({ delta: Math.round(ocpProps.delta.percent) });
            this.setState({ total: Math.round(ocpProps.total.value * 100) / 100 });
            this.setState({ totalUnits: ocpProps.total.units });
            this.setState({ date: ocpProps.data.date });
            this.setState({ filter: (-1 * ocpProps.time_scope_value) + ' ' + ocpProps.time_scope_units });
        }
    }

    render() {
        const {
            ocpSummaryFetchStatus
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
                                    <StackItem>${ this.state.total }</StackItem>
                                    <StackItem>{ moment(this.state.date).format('LL') }</StackItem>
                                </Stack>
                            </GridItem>
                            <GridItem>
                                <Stack>
                                    <StackItem gutter='md'> </StackItem>
                                    <StackItem>{ this.state.delta }</StackItem>
                                    <StackItem>Compared to { this.state.filter } ago</StackItem>
                                </Stack>
                            </GridItem>
                        </Grid>
                    ) } { ocpSummaryFetchStatus === 'pending' && (<Loading/>) }
                    <Grid gutter='md' span={6}>
                        <GridItem>
                            <Stack>
                                <StackItem gutter='md'>AWS Total Cost</StackItem>
                                <StackItem>$15,196.28</StackItem>
                                <StackItem></StackItem>
                            </Stack>
                        </GridItem>
                        <GridItem>
                            <Stack>
                                <StackItem gutter='md'> </StackItem>
                                <StackItem>%10</StackItem>
                                <StackItem>Compared to last month</StackItem>
                            </Stack>
                        </GridItem>
                    </Grid>
                </CardBody>
                <CardFooter>View All Cost/Charges</CardFooter>
            </Card>
        );
    }
}

CostManagementCard.propTypes = {
    fetchOcpSummary: PropTypes.func,
    ocpSummary: PropTypes.object,
    ocpSummaryFetchStatus: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    ocpSummary: state.DashboardStore.ocpSummary,
    ocpSummaryFetchStatus: state.DashboardStore.ocpSummaryFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchOcpSummary: (url) => dispatch(AppActions.fetchOcpSummary(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(CostManagementCard));

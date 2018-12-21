import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    Card, CardBody, CardHeader,
    Grid, GridItem,
    Stack, StackItem,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';

import './_cards.scss';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class CostManagementCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchOcpSummary(); // eslint-disable-line camelcase
    }

    render() {

        const { ocpSummary } = this.props;
        const ocpDate = Date.parse(ocpSummary.data[0].date);
        const options = { month: 'long', year: 'numberic' };

        return (
            <Card>
                <CardHeader>
                    <Title className='pf-u-mt-0 pf-u-mb-0' size={'lg'}>Cost Management</Title>
                </CardHeader>
                <CardBody>
                    <Grid gutter='md' span={6}>
                        <GridItem>
                            <Stack>
                                <StackItem gutter='md'>OpenShift Total Charges</StackItem>
                                <StackItem>${ ocpSummary.total.value }</StackItem>
                                <StackItem>{ ocpDate.toLocaleDateString('ca-iso8601', options) }</StackItem>
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
                    <Grid gutter='md' span={6}>
                        <GridItem>
                            <Stack>
                                <StackItem gutter='md'>AWS Total Cost</StackItem>
                                <StackItem>$15,196.28</StackItem>
                                <StackItem>December 1st - 12th</StackItem>
                            </Stack>
                        </GridItem>
                        <GridItem>
                            <Stack>
                                <StackItem gutter='md'> </StackItem>
                                <StackItem>%10</StackItem>
                                <StackItem>Compared to last month</StackItem>
                            </Stack>
                        </GridItem>
                        <GridItem span={12}>View All Costs/Charges</GridItem>
                    </Grid>
                </CardBody>
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

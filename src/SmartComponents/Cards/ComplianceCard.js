import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams, Gauge } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    Card, CardBody, CardFooter, CardHeader,
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
class ComplianceCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.fetchCompliance();
    }

    componentDidUpdate (prevProps) {
        if (this.props.complianceSummary !== prevProps.complianceSummary) {
            const topPolicies = this.props.complianceSummary;
            this.setState({ topPolicies });
        }
    }

    render() {

        const {
            complianceFetchStatus
        } = this.props;

        return (
            <Card>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Compliance</Title>
                </CardHeader>
                <CardBody>
                    { complianceFetchStatus === 'fulfilled' && (
                        Array.isArray(this.state.topSeverities) && this.state.topSeverities.length && (
                            <React.Fragment>
                                { this.state.topSeverities.forEach(element => {
                                    return (<Grid gutter='md' span={6} rowSpan={2}>
                                        <GridItem>
                                            <Gauge label={ element.attributes.name } value={ element.this.score } />
                                        </GridItem>
                                        <GridItem>
                                            <Stack>
                                                <StackItem>{ element.attributes.name }</StackItem>
                                                <StackItem>{ element.attributes.compliant_host_count } of
                                                    { element.attributes.total_host_count } systems</StackItem>
                                            </Stack>
                                        </GridItem>
                                    </Grid>);
                                })}
                            </React.Fragment>
                        )
                    ) }
                </CardBody>
                <CardFooter>View All Compliance Policies</CardFooter>
            </Card>
        );
    }
}

ComplianceCard.propTypes = {
    fetchCompliance: PropTypes.func,
    complianceSummary: PropTypes.object,
    complianceFetchStatus: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    complianceSummary: state.DashboardStore.complianceSummary,
    complianceFetchStatus: state.DashboardStore.complianceFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchCompliance: (url) => dispatch(AppActions.fetchComplianceSummary(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard));

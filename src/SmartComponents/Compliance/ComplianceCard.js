import * as AppActions from '../../AppActions';

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    Split,
    SplitItem,
    Stack,
    StackItem,
    Title
} from '@patternfly/react-core';
import React, { Component } from 'react';

import { ClipboardCheckIcon } from '@patternfly/react-icons';
import { Gauge } from '@red-hat-insights/insights-frontend-components';
import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';

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
    }

    componentDidMount() {
        this.props.fetchCompliance();
    }

    render() {

        /*
         * Returns the first two -- if there are at least two entries -- items as a shallow copy of
         * complianceSummary
         */
        const getTopTwoPolicies = function (compliance) {
            const complianceTopTwo = compliance.data.length > 1 ? compliance.data.slice(0, 2) :
                compliance.data.slice();

            return complianceTopTwo;
        };

        const {
            complianceFetchStatus,
            complianceSummary
        } = this.props;

        return (
            <Card className='ins-c-card__compliance'
                { ...complianceFetchStatus !== 'pending' ? {
                    'data-ouia-safe': true
                } : { 'data-ouia-safe': false } }
            >
                <CardHeader>
                    <Title size={ 'lg' }>Compliance</Title>
                </CardHeader>
                <CardBody>
                    <Stack>
                        {complianceFetchStatus === 'fulfilled' &&
                            (Array.isArray(complianceSummary.data) &&
                                (complianceSummary.data.length > 0 ? (
                                    getTopTwoPolicies(complianceSummary).map(element =>
                                        <StackItem gutter='sm' key={ element.id }>
                                            <Split gutter='md' key={ element.id }>
                                                <SplitItem className='ins-c-gauge pf-u-text-align-center'>
                                                    <div className='ins-c-gauge__metrics-percentage'>
                                                        {Math.trunc(element.attributes.score * 100)}%</div>
                                                    <Gauge label={ element.attributes.name }
                                                        value={ Math.trunc(element.attributes.score * 100) } width={ 82 } height={ 82 }
                                                        timeframe='30'
                                                        identifier={ `compliance-gauge-${element.id}` } />
                                                </SplitItem>
                                                <SplitItem>
                                                    <Stack>
                                                        <StackItem>
                                                            <a href={ `/${UI_BASE}/compliance/policies/` }>{element.attributes.name}</a>
                                                        </StackItem>
                                                        <StackItem>
                                                            {element.attributes.compliant_host_count} of
                                        &nbsp;{element.attributes.total_host_count} systems</StackItem>
                                                    </Stack>
                                                </SplitItem>
                                            </Split>
                                        </StackItem>
                                    )
                                ) : (
                                    <EmptyState>
                                        <EmptyStateIcon icon={ ClipboardCheckIcon } />
                                        <EmptyStateBody> You have not uploaded any reports yet </EmptyStateBody>
                                    </EmptyState>
                                ))
                            )
                        }
                        {complianceFetchStatus === 'pending' && (<Loading />)}
                    </Stack>
                </CardBody>
                <CardFooter>
                    <a href={ `${UI_BASE}/compliance/policies/` }>
                        View all{complianceFetchStatus === 'fulfilled' && Array.isArray(complianceSummary.data) &&
                            complianceSummary.data.length > 1 ? ` ${complianceSummary.data.length} ` : ' '}
                        compliance policies
                    </a>
                </CardFooter>
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
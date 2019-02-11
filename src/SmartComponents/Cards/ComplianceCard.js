import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams, Gauge } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    Card, CardBody, CardFooter, CardHeader,
    Split, SplitItem,
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
            const complianceTopTwo = compliance.data.length > 1 ? compliance.slice(0, 2) :
                compliance.data.slice();

            return complianceTopTwo;
        };

        const {
            complianceFetchStatus,
            complianceSummary
        } = this.props;

        return (
            <Card className='ins-c-card__compliance'>
                <CardHeader>
                    <Title size={'lg'}>Compliance</Title>
                </CardHeader>
                <CardBody>
                    <Stack>
                        { complianceFetchStatus === 'fulfilled' && (
                            Array.isArray(complianceSummary.data) && complianceSummary.data.length > 0 && (
                                getTopTwoPolicies(complianceSummary).map(element =>
                                    <StackItem gutter='sm' key={ element.id }>
                                        <Split gutter='md' key={ element.id }>
                                            <SplitItem className='ins-c-gauge pf-u-text-align-center'>
                                                <div className='ins-c-gauge__metrics-percentage'>
                                                    { element.attributes.score * 100 }%
                                                </div>
                                                <Gauge label={ element.attributes.name }
                                                    value={ element.attributes.score * 100 } width={ 82 } height={ 82 }
                                                    timeframe='30'
                                                    identifier={ `compliance-gauge-${ element.id }` } />
                                            </SplitItem>
                                            <SplitItem>
                                                <Stack>
                                                    <StackItem>
                                                        <a href={ `/${release}/platform/compliance/policies/` }>{ element.attributes.name }</a>
                                                    </StackItem>
                                                    <StackItem>
                                                        { element.attributes.compliant_host_count } of
                                                        &nbsp;{ element.attributes.total_host_count } systems</StackItem>
                                                </Stack>
                                            </SplitItem>
                                        </Split>
                                    </StackItem>
                                )
                            )
                        ) }
                        { complianceFetchStatus === 'pending' && (<Loading/>) }
                    </Stack>
                </CardBody>
                <CardFooter>
                    <a href={ `/${release}/platform/compliance/policies/` }>
                        View All{ complianceFetchStatus === 'fulfilled' && Array.isArray(complianceSummary.data) &&
                            complianceSummary.data.length > 1 ? ` ${complianceSummary.data.length} ` : ' '}
                            Compliance Policies
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

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
                            Array.isArray(complianceSummary.data) && complianceSummary.data.length && (
                                <StackItem>
                                    {complianceSummary.data.map(element =>
                                        <Split gutter='md' key={ element.type }>
                                            <SplitItem className='ins-c-gauge__graph pf-u-text-align-center'>
                                                <div className='ins-c-gauge__metrics'>
                                                    <div className='ins-c-gauge__metrics-percentage'>
                                                        { element.attributes.score * 100 }%
                                                    </div>
                                                </div>
                                                <Gauge label={ element.attributes.name }
                                                    value={ element.attributes.score * 100 } width={ 72 } height={ 72 } />
                                            </SplitItem>
                                            <SplitItem>
                                                <Stack>
                                                    <StackItem>
                                                        <a href={ `/${release}/platform/security/compliance` }>{ element.attributes.name }</a>
                                                    </StackItem>
                                                    <StackItem>
                                                        { element.attributes.compliant_host_count } of
                                                        &nbsp;{ element.attributes.total_host_count } systems</StackItem>
                                                </Stack>
                                            </SplitItem>
                                        </Split>
                                    )}
                                </StackItem>
                            )
                        ) }
                        { complianceFetchStatus === 'pending' && (<Loading/>) }
                    </Stack>
                </CardBody>
                <CardFooter><a href={ `/${release}/platform/security/compliance/` }>View All Compliance Policies</a></CardFooter>
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

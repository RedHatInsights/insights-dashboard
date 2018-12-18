import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Title } from '@patternfly/react-core';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
        this.props.fetchCompliance({ per_page: 3 }); // eslint-disable-line camelcase
    }

    render() {

        return (
            <Card className='pf-m-dark'>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Compliance</Title>
                </CardHeader>
                <CardBody>

                </CardBody>
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

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCompliance: (url) => AppActions.fetchComplianceSummary(url)
}, dispatch);

function SummaryItem (props) {
    const name = props.profile.name;
    const score = props.profile.score;
    return (
        <React.Fragment>
            <li> {name}: {score * 100}% compliance </li>
        </React.Fragment>
    );
}

SummaryItem.propTypes = {
    profile: PropTypes.object
};

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard));

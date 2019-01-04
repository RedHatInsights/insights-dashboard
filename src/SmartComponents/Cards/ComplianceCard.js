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
        this.props.fetchCompliance({ per_page: 3 }); // eslint-disable-line camelcase
    }

    render() {

        return (
            <Card>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Compliance</Title>
                </CardHeader>
                <CardBody>
                    <Grid gutter='md' span={6} rowSpan={2}>
                        <GridItem>
                            <Gauge label='PCI' value={ 650 / 1000 } identifier='pci-gauge' />
                        </GridItem>
                        <GridItem>
                            <Stack>
                                <StackItem>PCI DSS v3</StackItem>
                                <StackItem>650 of 1000 systems</StackItem>
                            </Stack>
                        </GridItem>
                    </Grid>
                    <Grid gutter='md' span={6} rowSpan={2}>
                        <GridItem>
                            <Gauge label='HIPAA' value={ 432 / 432 } identifier='hipaa-gauge' />
                        </GridItem>
                        <GridItem>
                            <Stack>
                                <StackItem>HIPAA</StackItem>
                                <StackItem>432 of 432 systems</StackItem>
                            </Stack>
                        </GridItem>
                    </Grid>
                </CardBody>
                <CardFooter>View All 4 Compliance Policies</CardFooter>
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

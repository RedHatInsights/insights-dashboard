import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    Card, CardBody, CardFooter, CardHeader,
    Grid, GridItem,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';
import Loading from '../../PresentationalComponents/Loading/Loading';

import './_cards.scss';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class ConfigAssessmentCard extends Component {

    constructor (props) {
        super(props);
        this.state = {
            severity: [],
            total: 0,
            category: [],
            sevNames: ['Low', 'Medium', 'High', 'Critical']
        };
    }

    componentDidMount () {
        this.props.fetchConfigAssessment();
    }

    componentDidUpdate (prevProps) {
        if (this.props.configAssessment !== prevProps.configAssessment) {
            const rules = this.props.configAssessment.rules;
            this.setState({ severity: [rules.severity.Info, rules.severity.Warn, rules.severity.Error, rules.severity.Critical] });
            this.setState({
                category: [rules.category.Availability, rules.category.Security, rules.category.Stability, rules.category.Performance]
            });
            this.setState({ total: rules.total });
        }
    }

    render() {
        const {
            configAssessmentFetchStatus
        } = this.props;

        return (
            <Card>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Configuration Assessment</Title>
                </CardHeader>
                <CardBody>
                    { configAssessmentFetchStatus === 'fulfilled' && (
                        <React.Fragment>
                            <Grid gutter='md' span={6} rowSpan={2}>
                                <GridItem><p>icon</p></GridItem>
                                <GridItem>{ this.state.severity[3] }</GridItem>
                                <GridItem>Critical Rule Hits</GridItem>
                            </Grid>
                            <Grid gutter='md' span={6} rowSpan={2}>
                                <GridItem><p>icon</p></GridItem>
                                <GridItem>{ this.state.severity[2] }</GridItem>
                                <GridItem>Critical Rule Hits</GridItem>
                            </Grid>
                        </React.Fragment>
                    ) }
                    { configAssessmentFetchStatus === 'pending' && (<Loading/>) }
                </CardBody>
                { configAssessmentFetchStatus === 'fulfilled' && (
                    <CardFooter>View All { this.state.total } Rule Hits</CardFooter>
                ) }
                { configAssessmentFetchStatus === 'pending' && (<Loading/>) }
            </Card>
        );
    }
}

ConfigAssessmentCard.propTypes = {
    fetchConfigAssessment: PropTypes.func,
    configAssessment: PropTypes.object,
    configAssessmentFetchStatus: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    configAssessment: state.DashboardStore.configAssessment,
    configAssessmentFetchStatus: state.DashboardStore.configAssessmentFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchConfigAssessment: (url) => dispatch(AppActions.fetchConfigAssessment(url))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigAssessmentCard));

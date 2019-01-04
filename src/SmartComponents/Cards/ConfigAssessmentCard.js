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
 * Configuration Assessment Card
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

            // iterate over rules.severities and push to topSeverities if value > 0 in order of greatest to least
            // break after 2 items have been added
            let topTwoSeverities = [];
            ['Critical', 'Error', 'Warn', 'Info'].some(element => {
                if (rules.severity[element] > 0) {
                    topTwoSeverities.push({
                        label: element,
                        value: rules.severity[element]
                    });
                    if (topTwoSeverities.length > 1) {
                        return true;
                    }
                }
            });

            this.setState({ severity: topTwoSeverities });
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
                            { this.state.severity.length === 0 ? (
                                <Grid gutter='md' span={6} rowSpan={2}> You have no critical rule hits</Grid>
                            ) : (
                                this.state.severity.forEach(element => {
                                    return (<Grid gutter='md' span={6} rowSpan={2}>
                                        <GridItem><p>icon</p></GridItem>
                                        <GridItem>{ element.value }</GridItem>
                                        <GridItem>{ element.label } Rule Hits</GridItem>
                                    </Grid>);
                                })
                            )}
                        </React.Fragment>
                    ) }
                    { configAssessmentFetchStatus === 'pending' && (<Loading/>) }
                </CardBody>
                { configAssessmentFetchStatus === 'fulfilled' && (
                    <CardFooter>View All { this.state.total > 0 ? this.state.total : ''} Rule Hits</CardFooter>
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

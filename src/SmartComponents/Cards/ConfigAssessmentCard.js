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
            total: 0
        };
    }

    componentDidMount () {
        // eslint-disable-next-line no-console
        console.log('componentDidMount');

        this.props.fetchConfigAssessment();
    }

    render() {
        const {
            configAssessmentFetchStatus,
            configAssessment
        } = this.props;

        if (configAssessmentFetchStatus === 'fulfilled') {
            // iterate over rules.severities and push to topSeverities if value > 0 in order of greatest to least
            // break after 2 items have been added
            let topTwoSeverities = [];
            ['Critical', 'Error', 'Warn', 'Info'].some(element => {
                if (configAssessment.rules.severity[element] > 0) {
                    topTwoSeverities.push({
                        label: element,
                        value: configAssessment.rules.severity[element]
                    });
                    if (topTwoSeverities.length > 1) {
                        return true;
                    }
                }
            });

            this.props.configAssessment.topTwoSeverities = topTwoSeverities;
        }

        // eslint-disable-next-line no-console
        console.log(configAssessmentFetchStatus);

        return (
            <Card>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Configuration Assessment</Title>
                </CardHeader>
                <CardBody>
                    { configAssessmentFetchStatus === 'fulfilled' && (
                        <React.Fragment>
                            <h1> { configAssessment.topTwoSeverities } severity</h1>
                            { configAssessment.topTwoSeverities.length === 0 ? (
                                <Grid gutter='md' span={6} rowSpan={2}> You have no critical rule hits</Grid>
                            ) : (
                                configAssessment.topTwoSeverities.forEach(element => {
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
                    <CardFooter>View All { configAssessment.rules.total > 0 ? configAssessment.rules.total : ''} Rule Hits</CardFooter>
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

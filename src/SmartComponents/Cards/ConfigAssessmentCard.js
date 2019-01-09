import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';
import { ExclamationCircleIcon, ExclamationTriangleIcon, ExclamationIcon } from '@patternfly/react-icons';

import {
    Card, CardBody, CardFooter, CardHeader,
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
    }

    componentDidMount () {
        this.props.fetchConfigAssessment();
    }

    render() {
        const {
            configAssessmentFetchStatus,
            configAssessment
        } = this.props;

        let severities = new Array();

        if (configAssessmentFetchStatus === 'fulfilled') {
            // iterate over rules.severities and push to topSeverities if value > 0 in order of greatest to least
            // break after 2 items have been added
            ['Critical', 'Error', 'Warn', 'Info'].some(element => {
                if (configAssessment.rules.severity[element] > 0) {
                    severities.push({
                        label: element,
                        value: configAssessment.rules.severity[element]
                    });
                    if (severities.length > 1) {
                        return true;
                    }
                }
            });
        }

        function getIcon (label) {
            switch (label) {
                case 'Critical':
                    return <ExclamationCircleIcon className='ins-c-summary__icon ins-c-summary__icon-critical' />;
                case 'Error':
                    return <ExclamationTriangleIcon className='ins-c-summary__icon ins-c-summary__icon-error' />;
                case 'Warn':
                    return <ExclamationTriangleIcon className='ins-c-summary__icon ins-c-summary__icon-warn' />;
                case 'Info':
                    return <ExclamationIcon className='ins-c-summary__icon ins-c-summary__icon-info' />;
            }
        }

        return (
            <Card className='ins-c-card__config-assessment'>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Configuration Assessment</Title>
                </CardHeader>
                <CardBody>
                    { configAssessmentFetchStatus === 'fulfilled' && Array.isArray(severities) && severities.length > 0 && (
                        severities.map(element =>
                            <div className='ins-c-summary' key={ element.label }>
                                { getIcon(element.label) }
                                <span className='ins-c-summary__emphasis'>{ element.value }</span>
                                <span className='ins-c-summary__label'>{ element.label }</span>
                            </div>
                        )
                    ) }
                    { configAssessmentFetchStatus === 'pending' && (<Loading/>) }
                </CardBody>
                { configAssessmentFetchStatus === 'fulfilled' && (
                    <CardFooter>View All { configAssessment.rules.total > 0 ? configAssessment.rules.total : ''} Rule Hits</CardFooter>
                ) }
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

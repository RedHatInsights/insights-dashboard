import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { routerParams } from '@red-hat-insights/insights-frontend-components';
import { connect } from 'react-redux';

import {
    CheckCircleIcon,
    ExclamationCircleIcon, ExclamationTriangleIcon, ExclamationIcon
} from '@patternfly/react-icons';

import {
    Card, CardBody, CardFooter, CardHeader,
    Title
} from '@patternfly/react-core';

import * as AppActions from '../../AppActions';
import Loading from '../../PresentationalComponents/Loading/Loading';

import './_cards.scss';

// expose RELEASE
/*global RELEASE:true*/
const release = RELEASE;

/**
 * Configuration Assessment for showing 2 highest categories with rule hits
 */
class InsightsCard extends Component {

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
            [
                { severity: 'Critical', label: 'Critical', link: 'critical-risk/' },
                { severity: 'Error', label: 'High', link: 'high-risk/' },
                { severity: 'Warn', label: 'Medium', link: 'medium-risk/' },
                { severity: 'Info', label: 'Low', link: 'low-risk/' }
            ].some(element => {
                if (configAssessment.rules.severity[element.severity] > 0) {
                    severities.push({
                        label: element.label,
                        value: configAssessment.rules.severity[element.severity],
                        link: element.link
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
                case 'High':
                    return <ExclamationTriangleIcon className='ins-c-summary__icon ins-c-summary__icon-high' />;
                case 'Medium':
                    return <ExclamationTriangleIcon className='ins-c-summary__icon ins-c-summary__icon-medium' />;
                case 'Low':
                    return <ExclamationIcon className='ins-c-summary__icon ins-c-summary__icon-low' />;
            }
        }

        return (
            <Card className='ins-c-card__insights'>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Insights</Title>
                </CardHeader>
                <CardBody>
                    { configAssessmentFetchStatus === 'fulfilled' && Array.isArray(severities) && severities.length > 0 && (
                        severities.map(element =>
                            <div className='ins-c-summary' key={ element.label }>
                                { getIcon(element.label) }
                                <span className='ins-c-summary__emphasis'>{ element.value }</span>
                                <span className='ins-c-summary__label'>
                                    <a href={ `/${ release }/platform/advisor/actions/${ element.link }` }>{ element.label } Rule Hits</a>
                                </span>
                            </div>
                        )
                    ) }
                    { configAssessmentFetchStatus === 'pending' && (<Loading/>) }
                    { configAssessmentFetchStatus === 'fulfilled' && (!Array.isArray(severities) || severities.length === 0) && (
                        <div className='ins-c-summary'>
                            <CheckCircleIcon className='ins-c-summary__icon ins-c-summary__icon-check' />
                            <span className='ins-c-summary__label'>You have no issues</span>
                        </div>
                    ) }
                </CardBody>
                <CardFooter>
                    <a href={ `/${ release }/platform/advisor/` }>
                        View All{ configAssessment.rules && configAssessment.rules.total > 0 ?
                            ` ${configAssessment.rules.total} ` : ''} Rule Hits
                    </a>
                </CardFooter>
            </Card>
        );
    }
}

InsightsCard.propTypes = {
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
)(InsightsCard));

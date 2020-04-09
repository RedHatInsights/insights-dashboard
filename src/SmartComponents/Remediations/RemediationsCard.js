import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as AppActions from '../../AppActions';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';

import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions
} from '../../PresentationalComponents/Template/TemplateCard';
// import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
// import FinishedIcon from './../../Icons/FinishedIcon';
// import RunningIcon from './../../Icons/RunningIcon';
// import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';
// import messages from '../../Messages';
import RunStatus from './RunStatus';
import './RemediationsCard.scss';
// import { useIntl } from 'react-intl';

/**
 * Remediations card.
 */
const RemediationsCard = ({
    fetchRemediations, remediationsFetchStatus, remediations
}) => {

    useEffect(() => {
        fetchRemediations();
    }, [fetchRemediations]);

    return (
        <TemplateCard appName='Remediations'>
            <TemplateCardHead>
                <TemplateCardActions downloadReport="true"/>
                <TemplateCardHeader title='Remediations'/>
            </TemplateCardHead>
            <TemplateCardBody>
                {remediationsFetchStatus === 'fulfilled' &&
                    (Array.isArray(remediations.data) &&
                        (remediations.data.length > 0 ? <React.Fragment>
                            { remediations.data.map(element =>
                                <RunStatus id={ element.id } name={ element.name } key={ element.id }/>
                            )}
                        </React.Fragment>
                            : <span> TODO </span>)
                    )
                }
            </TemplateCardBody>
        </TemplateCard>
    );
};

RemediationsCard.propTypes = {
    fetchRemediations: PropTypes.func,
    remediations: PropTypes.object,
    remediationsFetchStatus: PropTypes.string,
    intl: PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({
    remediations: state.DashboardStore.remediations,
    remediationsFetchStatus: state.DashboardStore.remediationsFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchRemediations: () => dispatch(AppActions.fetchRemediations())
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(RemediationsCard));

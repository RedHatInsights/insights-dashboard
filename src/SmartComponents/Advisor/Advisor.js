import './_Advisor.scss';

import * as AppActions from '../../AppActions';

import { INCIDENT_URL, NEW_REC_URL } from './Constants';
import React, { useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';

import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
import StackChart from './StackChart';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';

/**
 * Advisor Card for showing count/severity of rec hits
 */
const Advisor = ({ recStats, recStatsStatus, advisorFetchStatsRecs, advisorFetchStatsSystems,
    advisorIncidents, advisorIncidentsStatus, advisorFetchIncidents, systemsStats, systemsStatsStatus, intl }) => {

    useEffect(() => {
        advisorFetchStatsRecs();
        advisorFetchStatsSystems();
        advisorFetchIncidents();
    }, [advisorFetchIncidents, advisorFetchStatsRecs, advisorFetchStatsSystems]);

    return <TemplateCard appName='Advisor'>
        <TemplateCardHeader title='Advisor recommendations' />
        <TemplateCardBody>
            {advisorIncidentsStatus !== 'fulfilled' ? <Loading /> :
                <div className='ins-c-summary'>
                    <ExclamationCircleIcon className='ins-c-summary__icon ins-c-summary__icon-critical' />
                    <span className='ins-c-summary__emphasis'>{advisorIncidents.meta.count}</span>
                    <span className='ins-c-summary__label'>
                        <a href={ `${UI_BASE}${INCIDENT_URL}` }>
                            {intl.formatMessage(messages.incidentsDetected, { incidents: advisorIncidents.meta.count })}
                        </a>
                    </span>
                </div>
            }
            {recStatsStatus !== 'fulfilled' ? <Loading /> : <StackChart data={ recStats.total_risk } />}
            {systemsStatsStatus !== 'fulfilled' ? <Loading /> :
                <React.Fragment>
                    <a href={ `${UI_BASE}${NEW_REC_URL}` }>
                        {intl.formatMessage(messages.recsImpactingSystems, { totalRecs: recStats.total, systems: systemsStats.total })}
                    </a>
                </React.Fragment>}
        </TemplateCardBody>
    </TemplateCard>;
};

Advisor.propTypes = {
    advisorFetchStatsRecs: PropTypes.func,
    recStats: PropTypes.object,
    recStatsStatus: PropTypes.string,
    advisorFetchStatsSystems: PropTypes.func,
    systemsStats: PropTypes.object,
    systemsStatsStatus: PropTypes.string,
    advisorIncidents: PropTypes.object,
    advisorIncidentsStatus: PropTypes.string,
    advisorFetchIncidents: PropTypes.func,
    intl: PropTypes.any
};

export default injectIntl(connect(
    ({ DashboardStore }) => ({
        recStats: DashboardStore.advisorStatsRecs,
        recStatsStatus: DashboardStore.advisorStatsRecsStatus,
        systemsStats: DashboardStore.advisorStatsSystems,
        systemsStatsStatus: DashboardStore.advisorStatsSystemsStatus,
        advisorIncidents: DashboardStore.advisorIncidents,
        advisorIncidentsStatus: DashboardStore.advisorIncidentsStatus
    }),
    dispatch => ({
        advisorFetchStatsRecs: (url) => dispatch(AppActions.advisorFetchStatsRecs(url)),
        advisorFetchStatsSystems: (url) => dispatch(AppActions.advisorFetchStatsSystems(url)),
        advisorFetchIncidents: (url) => dispatch(AppActions.advisorFetchIncidents(url))
    })
)(Advisor));

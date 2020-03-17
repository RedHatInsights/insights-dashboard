import * as AppActions from '../../AppActions';

import React, { useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { INCIDENT_URL } from './Constants';
import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
import StackChart from './StackChart';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import { NumberDescription } from '../../../../insights-dashboard/src/PresentationalComponents/NumberDescription/NumberDescription';

/**
 * Advisor Card for showing count/severity of rec hits
 */
const Advisor = ({ recStats, recStatsStatus, advisorFetchStatsRecs, advisorFetchStatsSystems,
    advisorIncidents, advisorIncidentsStatus, advisorFetchIncidents, intl }) => {

    useEffect(() => {
        advisorFetchStatsRecs();
        advisorFetchStatsSystems();
        advisorFetchIncidents();
    }, [advisorFetchIncidents, advisorFetchStatsRecs, advisorFetchStatsSystems]);

    return <TemplateCard appName='Advisor'>
        <TemplateCardHeader title='Advisor recommendations' />
        <TemplateCardBody>
            { advisorIncidentsStatus !== 'fulfilled' ? <Loading /> :
                <NumberDescription
                    data={ advisorIncidents.meta.count }
                    dataSize="lg"
                    layout="horizontal"
                    linkDescription={ intl.formatMessage(messages.incidentsDetected, { incidents: advisorIncidents.meta.count }) }
                    link={ `${UI_BASE}${INCIDENT_URL}` }
                    critical="true"
                />
            }
            {recStatsStatus !== 'fulfilled' ? <Loading /> : <StackChart data={ recStats.total_risk } />}
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
